'use client';
import { useMemo, useState } from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import BottomSheet from '@/components/ui/bottom-sheet';
import { useCartStore } from '@/lib/store/cart-store';

const VAT_RATE = 0.042; // keep consistent with ProductActions

export default function CartButtonSheet({ variant = 'default', triggerClassName }: { variant?: 'default' | 'minimal'; triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);

  const quantity = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const total = useMemo(() => subtotal * (1 + VAT_RATE), [subtotal]);

  const triggerClass =
    triggerClassName ??
    (variant === 'minimal'
      ? 'relative inline-flex items-center justify-center p-1 text-gray-900'
      : 'relative inline-flex items-center justify-center rounded-full border border-gray-300 p-2 text-gray-700 hover:bg-gray-100');

  const badgeClass =
    variant === 'minimal'
      ? 'absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0C4B54] px-1 text-xs font-semibold text-white'
      : 'absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#0C4B54] px-1 text-[10px] font-semibold text-white';

  return (
    <div className="relative">
      <button onClick={() => setOpen(true)} aria-label="Open cart" className={triggerClass}>
        <ShoppingCart className="h-5 w-5" />
        {quantity > 0 && <span className={badgeClass}>{quantity}</span>}
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <div className="flex max-h-[85vh] flex-col">
          {/* Header */}
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-medium">Your Cart</div>
            {items.length > 0 && (
              <button onClick={() => clear()} className="text-xs text-red-600">
                Clear all
              </button>
            )}
          </div>

          {/* Scrollable content (items + totals) */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="rounded-lg border border-gray-200 p-4 text-sm text-gray-600">Your cart is empty.</div>
            ) : (
              <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
                {items.map((i) => (
                  <li key={`${i.id}-${i.size ?? 'nosize'}`} className="flex items-center gap-3 p-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                      {i.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={i.image} alt={i.title} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{i.title}</div>
                      <div className="text-xs text-gray-600">
                        {i.brand} {i.size ? `• Size ${i.size}` : ''} • Qty {i.qty}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">${(i.price * i.qty).toFixed(2)}</div>
                    <button
                      aria-label="Remove item"
                      onClick={() => remove(i.id, i.size ?? null)}
                      className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 space-y-1 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">VAT (4.2%)</span>
                <span className="font-medium text-gray-900">${(subtotal * VAT_RATE).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-base">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Fixed checkout button at the bottom */}
          <div className="pt-3">
            <button
              className="w-full rounded-full bg-[#0C4B54] px-4 py-3 text-sm font-medium text-white"
              aria-label="Checkout"
              onClick={() => alert('Checkout flow is not implemented in this demo.')}
            >
              Checkout
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}