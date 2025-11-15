import { useFilterStore } from '@/lib/store/filter-store';

const BRANDS = ['All', 'Nike', 'Adidas', 'Puma', 'Reebok', 'Fila'];

export default function BrandFilter() {
  const { brand, setBrand } = useFilterStore();
  return (
    <div className="flex gap-3 overflow-x-auto py-2 hide-scrollbar" aria-label="Filter by brand">
      {BRANDS.map((b) => {
        const active = (brand ?? 'All') === b;
        return (
          <button
            key={b}
            onClick={() => setBrand(b === 'All' ? null : b)}
            aria-pressed={active}
            aria-label={`Brand: ${b}`}
            className={
              'whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition ' +
              (active
                ? 'bg-[#0C4B54] text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
            }
          >
            {b}
          </button>
        );
      })}
    </div>
  );
}