import { useFilterStore } from '@/lib/store/filter-store';
import { X, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const PRICE_RANGES = ['0-50', '50-100', '100-200', '200-500', '500+'];
const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
const RATINGS = [4.5, 4, 3.5, '<3'] as const;

export default function FilterModal({ open, onClose, onOpenSort }: { open: boolean; onClose: () => void; onOpenSort?: () => void }) {
  const { priceRanges, togglePriceRange, sizes, toggleSize, minRating, setMinRating, clearFilters } = useFilterStore();
  const { t } = useI18n();

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filter products">
      {/* Full-screen panel */}
      <div className="absolute inset-0 bg-white">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="text-sm font-semibold text-gray-900">{t('filters.title')}</div>
          <button aria-label="Close filters" className="p-1" onClick={onClose}>
            <X className="h-5 w-5 text-gray-900" />
          </button>
        </div>

        {/* Sort By at top */}
        <section className="border-b border-gray-100 px-4 py-3" aria-label="Sort by">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{t('filters.sortBy')}</h3>
            <button
              type="button"
              aria-label="Open sort options"
              onClick={() => {
                onClose();
                onOpenSort?.();
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0C4B54]"
            >
              <span>{t('sort.mostRecommended')}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Content scroll area */}
        <div className="h-[calc(100vh-112px)] overflow-y-auto px-4 py-4">
          <section className="mb-6" aria-label="Price range">
            <h3 className="mb-2 text-sm font-medium">{t('filters.price')}</h3>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((r) => {
                const active = priceRanges.includes(r);
                return (
                  <button
                    key={r}
                    onClick={() => togglePriceRange(r)}
                    aria-pressed={active}
                    aria-label={`Price ${r}`}
                    className={
                      'rounded-lg px-3 py-2 text-xs ' +
                      (active ? 'bg-[#0C4B54] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                    }
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mb-6" aria-label="Size">
            <h3 className="mb-2 text-sm font-medium">{t('filters.size')}</h3>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => {
                const active = sizes.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    aria-pressed={active}
                    aria-label={`Size ${s}`}
                    className={
                      'rounded-lg px-3 py-2 text-xs ' +
                      (active ? 'bg-[#0C4B54] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                    }
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mb-6" aria-label="Minimum rating">
            <h3 className="mb-2 text-sm font-medium">{t('filters.rating')}</h3>
            <div className="flex flex-wrap gap-2">
              {RATINGS.map((r) => {
                const isNumber = typeof r === 'number';
                const active = isNumber ? (minRating ?? 0) === r : minRating === 0;
                return (
                  <button
                    key={r.toString()}
                    onClick={() => setMinRating(active ? null : isNumber ? r : 0)}
                    aria-pressed={active}
                    aria-label={`Rating ${isNumber ? `${r}+` : t('rating.lessThanThree')}`}
                    className={
                      'rounded-lg px-3 py-2 text-xs ' +
                      (active ? 'bg-[#0C4B54] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                    }
                  >
                    {isNumber ? `${r}+` : t('rating.lessThanThree')}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Bottom actions */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-3">
          <div className="mx-auto flex max-w-6xl gap-3">
            <button
              onClick={() => {
                clearFilters();
              }}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm"
              aria-label="Clear all filters"
            >
              {t('filters.clearAll')}
            </button>
            <button onClick={onClose} className="flex-1 rounded-lg bg-[#0C4B54] px-4 py-3 text-sm text-white" aria-label="Apply filters">
              {t('filters.apply')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}