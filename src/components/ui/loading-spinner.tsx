'use client';
import { useI18n } from '@/lib/i18n';

export default function LoadingSpinner({ text }: { text?: string }) {
  const { t } = useI18n();
  const label = text ?? t('loading.products');
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div
        aria-label="Loading"
        role="status"
        className="h-6 w-6 animate-spin rounded-full border-2 border-teal-700 border-t-transparent"
      />
      <div className="mt-3 text-sm text-gray-700">{label}</div>
    </div>
  );
}