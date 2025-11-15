import { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '@/lib/api/products';
import { useFilterStore } from '@/lib/store/filter-store';
import type { Product } from '@/lib/types/product';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';

function rangeToMinMax(range: string): { min: number; max: number } | null {
  // Supports formats like "min-max" and "min+" (e.g., "500+")
  if (range.endsWith('+')) {
    const min = Number(range.replace('+', ''));
    if (Number.isFinite(min)) return { min, max: Number.MAX_SAFE_INTEGER };
    return null;
  }
  const [minStr, maxStr] = range.split('-');
  const min = Number(minStr);
  const max = Number(maxStr);
  if (Number.isFinite(min) && Number.isFinite(max)) return { min, max };
  return null;
}

export function useProducts() {
  const { brand, priceRanges, sizes, minRating, sortBy, sortOrder, language, status } = useFilterStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useMemo(() => {
    let min_price: number | undefined;
    let max_price: number | undefined;
    if (priceRanges.length) {
      const parsed = priceRanges
        .map(rangeToMinMax)
        .filter(Boolean) as { min: number; max: number }[];
      if (parsed.length) {
        min_price = Math.min(...parsed.map((r) => r.min));
        max_price = Math.max(...parsed.map((r) => r.max));
      }
    }

    return {
      brand: brand ?? undefined,
      size: sizes[0] ?? undefined,
      status,
      min_price,
      max_price,
      min_rating: minRating ?? undefined,
      sort_by: sortBy ?? undefined,
      sort_order: sortOrder ?? undefined,
      language,
    };
  }, [brand, priceRanges, sizes, minRating, sortBy, sortOrder, language]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts({
          brand: brand ?? undefined,
          size: sizes[0] ?? undefined,
          status,
          min_price: undefined,
          max_price: undefined,
          min_rating: minRating ?? undefined,
          sort_by: sortBy ?? undefined,
          sort_order: sortOrder ?? undefined,
          language,
        });
        // If we computed min/max above, override fetch params here
        const { min_price, max_price } = (function () {
          let min: number | undefined;
          let max: number | undefined;
          if (priceRanges.length) {
            const parsed = priceRanges
              .map(rangeToMinMax)
              .filter(Boolean) as { min: number; max: number }[];
            if (parsed.length) {
              min = Math.min(...parsed.map((r) => r.min));
              max = Math.max(...parsed.map((r) => r.max));
            }
          }
          return { min_price: min, max_price: max };
        })();
        const dataWithPrice = await fetchProducts({
          brand: brand ?? undefined,
          size: sizes[0] ?? undefined,
          status,
          min_price,
          max_price,
          min_rating: minRating ?? undefined,
          sort_by: sortBy ?? undefined,
          sort_order: sortOrder ?? undefined,
          language,
        });
        if (!cancelled) setProducts(dataWithPrice?.length ? dataWithPrice : data ?? MOCK_PRODUCTS);
      } catch (err) {
        if (!cancelled) setError((err as Error).message || 'Failed to fetch products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [brand, priceRanges, sizes, minRating, sortBy, sortOrder, language, status]);

  return { products, loading, error };
}