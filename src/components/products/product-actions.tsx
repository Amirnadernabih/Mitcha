'use client';
import { useState, useMemo, useRef } from 'react';
import SizeSelector from './size-selector';
import { useCartStore } from '@/lib/store/cart-store';
import type { Product } from '@/lib/types/product';
import { useI18n } from '@/lib/i18n';

const DEFAULT_SIZES = ['S', 'M', 'L', 'XL', '2XL'];
const VAT_RATE = 0.042; // ~4.2% to match design reference

export default function ProductActions({ product }: { product: Product }) {
  const { addItem: add } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = useMemo(() => product.sizes ?? DEFAULT_SIZES, [product.sizes]);
  const { t } = useI18n();

  const [errorOpen, setErrorOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const successTimeoutRef = useRef<number | null>(null);

  const totalWithVat = useMemo(() => {
    const priceNum = typeof product.price === 'number' ? product.price : Number(product.price);
    const total = priceNum + priceNum * VAT_RATE;
    return total;
  }, [product.price]);

  function showError() {
    setErrorOpen(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setErrorOpen(false), 4000);
  }
  function showSuccess() {
    setSuccessOpen(true);
    if (successTimeoutRef.current) window.clearTimeout(successTimeoutRef.current);
    successTimeoutRef.current = window.setTimeout(() => setSuccessOpen(false), 4000);
  }

  return (
    <div>
      {/* Error toast in top-right */}
      {errorOpen && (
        <div
          className="fixed top-4 right-4 z-50 cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-lg"
          role="alert"
          aria-live="assertive"
          onClick={() => {
            setErrorOpen(false);
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          }}
        >
          {t('actions.selectSizeError')}
        </div>
      )}

      {/* Success toast in top-right */}
      {successOpen && (
        <div
          className="fixed top-4 right-4 z-50 cursor-pointer rounded-md bg-[#0C4B54] px-4 py-2 text-sm font-medium text-white shadow-lg"
          role="status"
          aria-live="polite"
          onClick={() => {
            setSuccessOpen(false);
            if (successTimeoutRef.current) window.clearTimeout(successTimeoutRef.current);
          }}
        >
          {t('actions.itemAdded')}
        </div>
      )}

      {/* Size selector section */}
      <SizeSelector
        sizes={sizes}
        onChange={(s) => setSelectedSize(s)}
        value={selectedSize ?? undefined}
      />

      {/* Fixed bottom price + Add to Cart */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">{t('actions.totalPrice')}</div>
              <div className="text-xs text-gray-500">{t('actions.withVat')}</div>
            </div>
            <div className="text-base font-semibold text-gray-900">${totalWithVat.toFixed(2)}</div>
          </div>
          <div className="mt-3 flex items-center justify-center">
            <button
              className={
                'w-[90%] rounded-lg bg-[#0C4B54] px-4 py-3 text-sm font-medium text-white shadow-sm transition ' +
                (!selectedSize ? ' cursor-not-allowed opacity-50' : '')
              }
              aria-label="Add product to cart"
              disabled={!selectedSize}
              onClick={() => {
                if (!selectedSize) {
                  showError();
                  return;
                }
                add(product, selectedSize);
                showSuccess();
              }}
            >
              {t('actions.addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
