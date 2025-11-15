const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://task.woosonicpwa.com/api';
import { normalizeProduct } from '@/lib/utils/normalize';
import type { Product } from '@/lib/types/product';

export async function fetchProducts(params: {
  brand?: string;
  size?: string;
  status?: 'active' | 'inactive';
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  sort_by?: string;
  sort_order?: string;
  language?: 'en' | 'fr';
}): Promise<Product[]> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value && key !== 'language') {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_BASE}/products?${searchParams.toString()}`, {
    headers: {
      'Accept-Language': params.language || 'en',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const payload = await response.json();
  const raw = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];
  return raw.map(normalizeProduct);
}

export async function fetchProductById(id: string, language: 'en' | 'fr' = 'en'): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    headers: {
      'Accept-Language': language,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const payload = await response.json();
  const raw = payload?.data ?? payload;
  return normalizeProduct(raw);
}