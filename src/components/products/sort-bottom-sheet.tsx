import BottomSheet from '@/components/ui/bottom-sheet';
import { useFilterStore } from '@/lib/store/filter-store';
import { Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const OPTIONS = [
  { labelKey: 'sort.mostRecommended', sortBy: 'created_at', sortOrder: 'desc' as const },
  { labelKey: 'sort.priceLowFirst', sortBy: 'price', sortOrder: 'asc' as const },
  { labelKey: 'sort.priceHighFirst', sortBy: 'price', sortOrder: 'desc' as const },
  { labelKey: 'sort.bestRating', sortBy: 'rating', sortOrder: 'desc' as const },
];

export default function SortBottomSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { sortBy, sortOrder, setSorting } = useFilterStore();
  const { t } = useI18n();

  return (
    <BottomSheet open={open} onClose={onClose}>
      <h3 className="mb-3 text-sm font-medium">{t('filters.sortBy')}</h3>
      <div className="flex flex-col">
        {OPTIONS.map((opt) => {
          const active = sortBy === opt.sortBy && sortOrder === opt.sortOrder;
          return (
            <button
              key={opt.labelKey}
              onClick={() => {
                setSorting(opt.sortBy, opt.sortOrder);
                onClose();
              }}
              className={
                'flex items-center justify-between rounded-lg px-4 py-4 text-sm ' +
                (active ? 'bg-[#0C4B54] text-white' : 'hover:bg-gray-100')
              }
            >
              <span className="font-medium">{t(opt.labelKey)}</span>
              {active && <Check className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}