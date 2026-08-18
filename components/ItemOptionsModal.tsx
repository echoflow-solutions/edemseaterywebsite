'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { useOrder } from './OrderProvider';
import { findMenuItem, formatCents, priceSelection, type OptionSelections } from '@/lib/menu';

const ItemOptionsModal = () => {
  const { optionsItemId, closeOptions, addItem, openCart } = useOrder();
  const item = optionsItemId ? findMenuItem(optionsItemId) : undefined;

  const [selections, setSelections] = useState<OptionSelections>({});

  // Preselect the first choice in every group so the modal opens with a
  // valid, priced configuration rather than a disabled button.
  useEffect(() => {
    if (!item) return;
    const initial: OptionSelections = {};
    for (const group of item.options ?? []) {
      initial[group.id] = group.choices[0]?.id ?? '';
    }
    setSelections(initial);
  }, [item]);

  useEffect(() => {
    if (!optionsItemId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeOptions();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [optionsItemId, closeOptions]);

  const price = useMemo(
    () => (item ? priceSelection(item, selections) : null),
    [item, selections]
  );

  const confirm = () => {
    if (!item || price === null) return;
    addItem(item.id, selections);
    closeOptions();
    openCart();
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeOptions}
          role="dialog"
          aria-modal="true"
          aria-labelledby="item-options-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
          >
            <header className="flex items-start justify-between gap-3 p-6 pb-4 flex-shrink-0">
              <div>
                <h2 id="item-options-title" className="text-2xl font-bold font-heading text-primary">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={closeOptions}
                aria-label="Close"
                className="w-9 h-9 flex-shrink-0 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-primary" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 space-y-6">
              {(item.options ?? []).map((group) => (
                <fieldset key={group.id}>
                  <legend className="font-bold text-primary">{group.label}</legend>
                  {group.hint && <p className="text-xs text-gray-500 mb-2">{group.hint}</p>}
                  <div className="mt-2 space-y-2">
                    {group.choices.map((choice) => {
                      const checked = selections[group.id] === choice.id;
                      return (
                        <label
                          key={choice.id}
                          className={`flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            checked
                              ? 'border-secondary bg-secondary/10'
                              : 'border-primary/10 hover:bg-secondary/5'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={group.id}
                              value={choice.id}
                              checked={checked}
                              onChange={() =>
                                setSelections((current) => ({
                                  ...current,
                                  [group.id]: choice.id,
                                }))
                              }
                              className="accent-[#FFC107]"
                            />
                            <span className="text-primary">{choice.label}</span>
                          </span>
                          {group.effect === 'sets-price' && choice.priceCents !== undefined && (
                            <span className="font-bold text-primary whitespace-nowrap">
                              {formatCents(choice.priceCents)}
                            </span>
                          )}
                          {group.effect === 'adds-cost' && (choice.extraCents ?? 0) > 0 && (
                            <span className="font-bold text-primary whitespace-nowrap">
                              +{formatCents(choice.extraCents ?? 0)}
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            <footer className="flex-shrink-0 p-6 pt-4">
              <button
                type="button"
                onClick={confirm}
                disabled={price === null}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold bg-secondary text-primary hover:bg-secondary/90 transition-colors disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                Add to order
                {price !== null && <span>&middot; {formatCents(price)}</span>}
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemOptionsModal;
