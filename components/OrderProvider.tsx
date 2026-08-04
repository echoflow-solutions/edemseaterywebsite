'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { findMenuItem } from '@/lib/menu';

export type OrderMode = 'pickup' | 'delivery';

export type CartLine = {
  id: string;
  quantity: number;
};

export type PickupWhen = { type: 'asap' } | { type: 'scheduled'; value: string; label: string };

const MODE_STORAGE_KEY = 'edems.orderMode.v1';
const CART_STORAGE_KEY = 'edems.cart.v1';

type OrderContextValue = {
  mode: OrderMode | null;
  chooseMode: (mode: OrderMode) => void;
  resetMode: () => void;

  chooserOpen: boolean;
  openChooser: (pendingItemId?: string) => void;
  closeChooser: () => void;

  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  lines: CartLine[];
  itemCount: number;
  subtotalCents: number;
  quantityOf: (id: string) => number;
  addItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  pickupWhen: PickupWhen;
  setPickupWhen: (when: PickupWhen) => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export const useOrder = (): OrderContextValue => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used inside an OrderProvider');
  }
  return context;
};

const readStoredCart = (): CartLine[] => {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry): entry is CartLine => {
        if (typeof entry !== 'object' || entry === null) return false;
        const line = entry as Partial<CartLine>;
        return typeof line.id === 'string' && typeof line.quantity === 'number';
      })
      // Drop anything the menu no longer contains — item names and prices
      // change, and a stale cart must never resurrect a discontinued dish.
      .filter((line) => findMenuItem(line.id) !== undefined)
      .map((line) => ({ id: line.id, quantity: Math.min(Math.max(1, line.quantity), 20) }));
  } catch {
    return [];
  }
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<OrderMode | null>(null);
  const [chooserOpen, setChooserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [pickupWhen, setPickupWhen] = useState<PickupWhen>({ type: 'asap' });
  const [hydrated, setHydrated] = useState(false);

  // Restore after mount so server and client render the same first pass.
  useEffect(() => {
    const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY);
    if (storedMode === 'pickup' || storedMode === 'delivery') {
      setMode(storedMode);
    }
    setLines(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (mode) {
      window.localStorage.setItem(MODE_STORAGE_KEY, mode);
    } else {
      window.localStorage.removeItem(MODE_STORAGE_KEY);
    }
  }, [mode, hydrated]);

  const addItem = useCallback((id: string) => {
    const item = findMenuItem(id);
    if (!item || item.priceCents === null) return;
    setLines((current) => {
      const existing = current.find((line) => line.id === id);
      if (!existing) return [...current, { id, quantity: 1 }];
      return current.map((line) =>
        line.id === id ? { ...line, quantity: Math.min(line.quantity + 1, 20) } : line
      );
    });
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((current) => {
      if (quantity <= 0) return current.filter((line) => line.id !== id);
      return current.map((line) =>
        line.id === id ? { ...line, quantity: Math.min(quantity, 20) } : line
      );
    });
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const openChooser = useCallback((itemId?: string) => {
    setPendingItemId(itemId ?? null);
    setChooserOpen(true);
  }, []);

  const closeChooser = useCallback(() => {
    setChooserOpen(false);
    setPendingItemId(null);
  }, []);

  const chooseMode = useCallback(
    (next: OrderMode) => {
      setMode(next);
      setChooserOpen(false);
      if (next === 'pickup') {
        // Carry through whatever the customer was trying to order.
        if (pendingItemId) {
          addItem(pendingItemId);
          setCartOpen(true);
        }
      }
      setPendingItemId(null);
    },
    [addItem, pendingItemId]
  );

  const resetMode = useCallback(() => setMode(null), []);

  const quantityOf = useCallback(
    (id: string) => lines.find((line) => line.id === id)?.quantity ?? 0,
    [lines]
  );

  const { itemCount, subtotalCents } = useMemo(() => {
    return lines.reduce(
      (totals, line) => {
        const item = findMenuItem(line.id);
        if (!item || item.priceCents === null) return totals;
        return {
          itemCount: totals.itemCount + line.quantity,
          subtotalCents: totals.subtotalCents + item.priceCents * line.quantity,
        };
      },
      { itemCount: 0, subtotalCents: 0 }
    );
  }, [lines]);

  const value = useMemo<OrderContextValue>(
    () => ({
      mode,
      chooseMode,
      resetMode,
      chooserOpen,
      openChooser,
      closeChooser,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      lines,
      itemCount,
      subtotalCents,
      quantityOf,
      addItem,
      setQuantity,
      clearCart,
      pickupWhen,
      setPickupWhen,
    }),
    [
      mode,
      chooseMode,
      resetMode,
      chooserOpen,
      openChooser,
      closeChooser,
      cartOpen,
      lines,
      itemCount,
      subtotalCents,
      quantityOf,
      addItem,
      setQuantity,
      clearCart,
      pickupWhen,
    ]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
