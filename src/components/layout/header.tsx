"use client";
import { ArrowLeft } from 'lucide-react';
import CartButtonSheet from '@/components/cart/cart-button-sheet';
import { useRouter } from 'next/navigation';
import LanguageToggle from '@/components/layout/language-toggle';
import { useI18n } from '@/lib/i18n';

export default function Header({ backDisabled = false }: { backDisabled?: boolean }) {
  const router = useRouter();
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center px-4 py-3">
        {/* Left: Back button */}
        <div className="flex items-center">
          <button
            aria-label="Back"
            onClick={() => {
              if (!backDisabled) router.back();
            }}
            className="p-1"
            disabled={backDisabled}
            aria-disabled={backDisabled}
          >
            <ArrowLeft className="h-5 w-5 text-gray-900" />
          </button>
        </div>
        {/* Center: Title */}
        <div className="flex items-center justify-center">
          <div className="text-sm font-semibold text-gray-900">{t('header.title')}</div>
        </div>
        {/* Right: Cart trigger (opens bottom sheet) */}
        <div className="flex items-center justify-end gap-3">
          <LanguageToggle />
          <CartButtonSheet variant="minimal" />
        </div>
      </div>
    </header>
  );
}