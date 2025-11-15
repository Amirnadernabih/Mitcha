import { useEffect, useState } from 'react';
import { fetchProductById } from '@/lib/api/products';
import type { Product } from '@/lib/types/product';
import { useFilterStore } from '@/lib/store/filter-store';

export function useProductDetail(id: string) {
  const { language } = useFilterStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id, language);
        if (!cancelled) setProduct(data ?? null);
      } catch (err) {
        if (!cancelled) setError((err as Error).message || 'Failed to fetch product');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [id, language]);

  return { product, loading, error };
}