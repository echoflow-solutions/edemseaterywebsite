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
import { findMenuItem, hasOptions, priceSelection, type OptionSelections } from '@/lib/menu';

export type OrderMode = 'pickup' | 'delivery';

export type CartLine = {
  /** Item id plus its chosen options — two Jollofs with different proteins are separate lines. */
  key: string;
  id: string;
  quantity: number;
  options: OptionSelections;
};

export type PickupWhen = { type: 'asap' } | { type: 'scheduled'; value: string; label: string };

const MODE_STORAGE_KEY = 'edems.orderMode.v1';
const CART_STORAGE_KEY = 'edems.cart.v2';

/** Stable key for an item + option combination. */
export const lineKeyFor = (id: string, options: OptionSelections): string => {
  const parts = Object.keys(options)
    .sort()
    .map((group) => `${group}:${options[group]}`);
  return parts.length > 0 ? `${id}|${parts.join(',')}` : id;
};

type OrderContextValue = {
  mode: OrderMode | null;
  chooseMode: (mode: OrderMode) => void;

  chooserOpen: boolean;
  openChooser: (pendingItemId?: string) => void;
  closeChooser: () => void;

  optionsItemId: string | null;
  openOptions: (id: string) => void;
  closeOptions: () => void;

  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  lines: CartLine[];
  itemCount: number;
  subtotalCents: number;
  /** Total quantity of an item across every option combination. */
  quantityOf: (id: string) => number;
  addItem: (id: string, options?: OptionSelections) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;

  pickupWhen: PickupWhen;
  setPickupWhen: (when: PickupWhen) => void;

  checkoutEnabled: boolean;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export const useOrder = (): OrderContextValue => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used inside an OrderProvider');
  return context;
};

const readStoredCart = (): CartLine[] => {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((entry): CartLine[] => {
      if (typeof entry !== 'object' || entry === null) return [];
      const line = entry as Partial<CartLine>;
      if (typeof line.id !== 'string' || typeof line.quantity !== 'number') return [];

      const options: OptionSelections =
        line.options && typeof line.options === 'object' ? line.options : {};
      const item = findMenuItem(line.id);
      // Drop anything the menu no longer sells, and any selection that is no
      // longer valid — prices and option sets change between menu versions.
      if (!item || priceSelection(item, options) === null) return [];

      return [
        {
          key: lineKeyFor(line.id, options),
          id: line.id,
          options,
          quantity: Math.min(Math.max(1, line.quantity), 20),
        },
      ];
    });
  } catch {
    return [];
  }
};

export const OrderProvider = ({
  children,
  checkoutEnabled = false,
}: {
  children: ReactNode;
  checkoutEnabled?: boolean;
}) => {
  const [mode, setMode] = useState<OrderMode | null>(null);
  const [chooserOpen, setChooserOpen] = useState(false);
  const [optionsItemId, setOptionsItemId] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [pickupWhen, setPickupWhen] = useState<PickupWhen>({ type: 'asap' });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedMode = window.localStorage.getItem(MODE_STORAGE_KEY);
    if (storedMode === 'pickup' || storedMode === 'delivery') setMode(storedMode);
    setLines(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (mode) window.localStorage.setItem(MODE_STORAGE_KEY, mode);
    else window.localStorage.removeItem(MODE_STORAGE_KEY);
  }, [mode, hydrated]);

  const addItem = useCallback((id: string, options: OptionSelections = {}) => {
    const item = findMenuItem(id);
    if (!item || priceSelection(item, options) === null) return;
    const key = lineKeyFor(id, options);
    setLines((current) => {
      const existing = current.find((line) => line.key === key);
      if (!existing) return [...current, { key, id, options, quantity: 1 }];
      return current.map((line) =>
        line.key === key ? { ...line, quantity: Math.min(line.quantity + 1, 20) } : line
      );
    });
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((current) => {
      if (quantity <= 0) return current.filter((line) => line.key !== key);
      return current.map((line) =>
        line.key === key ? { ...line, quantity: Math.min(quantity, 20) } : line
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

  const openOptions = useCallback((id: string) => setOptionsItemId(id), []);
  const closeOptions = useCallback(() => setOptionsItemId(null), []);

  /** Deferred so a modal's scroll lock is released before the page moves. */
  const goToMenu = useCallback(() => {
    window.setTimeout(() => {
      document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
    }, 220);
  }, []);

  const chooseMode = useCallback(
    (next: OrderMode) => {
      setMode(next);
      setChooserOpen(false);

      if (next === 'pickup') {
        const pending = pendingItemId ? findMenuItem(pendingItemId) : undefined;
        if (pending && hasOptions(pending)) {
          // Needs choices before it can be priced — ask for them.
          window.setTimeout(() => setOptionsItemId(pending.id), 220);
        } else if (pending) {
          addItem(pending.id);
          setCartOpen(true);
        } else if (lines.length > 0) {
          setCartOpen(true);
        } else {
          goToMenu();
        }
      }

      setPendingItemId(null);
    },
    [addItem, goToMenu, lines.length, pendingItemId]
  );

  const quantityOf = useCallback(
    (id: string) =>
      lines.reduce((total, line) => (line.id === id ? total + line.quantity : total), 0),
    [lines]
  );

  const { itemCount, subtotalCents } = useMemo(
    () =>
      lines.reduce(
        (totals, line) => {
          const item = findMenuItem(line.id);
          const unit = item ? priceSelection(item, line.options) : null;
          if (unit === null) return totals;
          return {
            itemCount: totals.itemCount + line.quantity,
            subtotalCents: totals.subtotalCents + unit * line.quantity,
          };
        },
        { itemCount: 0, subtotalCents: 0 }
      ),
    [lines]
  );

  const value = useMemo<OrderContextValue>(
    () => ({
      mode,
      chooseMode,
      chooserOpen,
      openChooser,
      closeChooser,
      optionsItemId,
      openOptions,
      closeOptions,
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
      checkoutEnabled,
    }),
    [
      mode, chooseMode, chooserOpen, openChooser, closeChooser,
      optionsItemId, openOptions, closeOptions, cartOpen,
      lines, itemCount, subtotalCents, quantityOf, addItem, setQuantity,
      clearCart, pickupWhen, checkoutEnabled,
    ]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
