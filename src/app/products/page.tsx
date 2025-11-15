'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BrandFilter from '@/components/products/brand-filter';
import ProductGrid from '@/components/products/product-grid';
import FilterModal from '@/components/products/filter-modal';
import SortBottomSheet from '@/components/products/sort-bottom-sheet';
import Header from '@/components/layout/header';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useProducts } from '@/hooks/use-products';
import { useFilterStore } from '@/lib/store/filter-store';
import { SlidersHorizontal } from 'lucide-react';

export default function ProductsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const { products, loading, error } = useProducts();

  const searchParams = useSearchParams();
  const hydratedRef = useRef(false);
  const { setBrand, togglePriceRange, toggleSize, setMinRating, setSorting, setLanguage } = useFilterStore();

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    const brand = searchParams.get('brand');
    const size = searchParams.get('size');
    const status = searchParams.get('status');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');
    const minRating = searchParams.get('min_rating');
    const sortBy = searchParams.get('sort_by');
    const sortOrder = searchParams.get('sort_order');
    const lang = searchParams.get('lang');

    if (brand) setBrand(brand);
    if (size) toggleSize(size);
    if (minPrice && maxPrice) togglePriceRange(`${minPrice}-${maxPrice}`);
    if (minRating) setMinRating(Number(minRating));
    if (sortBy || sortOrder) setSorting(sortBy as any, (sortOrder as 'asc' | 'desc') || 'asc');
    if (lang === 'en' || lang === 'fr') setLanguage(lang);
    // If status is provided, we currently default to 'active' in useProducts params.
    // Future: add status to filter store to allow UI control.
  }, [searchParams, setBrand, toggleSize, togglePriceRange, setMinRating, setSorting, setLanguage]);

  return (
    <div className="min-h-screen bg-white">
      {/* New header: back-left, centered title, right cart; back disabled on main page */}
      <Header backDisabled />
      <div className="mx-auto max-w-6xl px-4 py-4">
        <BrandFilter />

        {loading && (
          <LoadingSpinner text="loading products now" />
        )}
        {error && (
          <div className="py-10 text-center text-sm text-red-600">{error}</div>
        )}
        {!loading && !error && <ProductGrid products={products} />}
      </div>

      {/* Floating filter button bottom right */}
      <button
        aria-label="Open filters"
        onClick={() => setFilterOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#0C4B54] p-4 text-white shadow-lg"
      >
        <SlidersHorizontal className="h-5 w-5" />
      </button>

      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)} onOpenSort={() => setSortOpen(true)} />
      <SortBottomSheet open={sortOpen} onClose={() => setSortOpen(false)} />
    </div>
  );
}