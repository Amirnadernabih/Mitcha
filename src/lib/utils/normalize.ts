import type { Product } from '@/lib/types/product';

function stabilizePicsum(url: string, seed: string, defaultSize = 800): string {
  try {
    const u = new URL(url);
    if (u.hostname !== 'picsum.photos') return url;
    const path = u.pathname;
    if (/\/(id|seed)\//.test(path)) return url; // already deterministic

    const parts = path.split('/').filter(Boolean);
    let w = defaultSize;
    let h = defaultSize;
    if (parts.length >= 2 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
      w = Number(parts[0]);
      h = Number(parts[1]);
    }
    u.pathname = `/seed/${encodeURIComponent(seed)}/${w}/${h}`;
    return u.toString();
  } catch {
    return url;
  }
}

export function normalizeProduct(api: any): Product {
  const priceNum = typeof api?.price === 'number' ? api.price : Number(api?.price);
  const ratingNumRaw =
    typeof api?.rating === 'number'
      ? api.rating
      : typeof api?.average_rating === 'number'
      ? api.average_rating
      : Number(api?.rating ?? api?.avg_rating ?? 0);
  const ratingNum = Number.isFinite(ratingNumRaw) ? ratingNumRaw : 0;

  const reviewCountNumRaw =
    typeof api?.reviewCount === 'number'
      ? api.reviewCount
      : typeof api?.reviews_count === 'number'
      ? api.reviews_count
      : Number(api?.reviewCount ?? 0);
  const reviewCountNum = Number.isFinite(reviewCountNumRaw) ? reviewCountNumRaw : 0;

  const reviews = Array.isArray(api?.reviews)
    ? api.reviews.map((rv: any) => {
        const rawDate: string | undefined = rv?.date ?? rv?.created_at ?? rv?.createdAt;
        // Sanitize ISO with microseconds like "2025-10-21T08:15:02.000000Z" to a JS-friendly form.
        const sanitizedDate = typeof rawDate === 'string' ? rawDate.replace(/\.\d+Z$/, 'Z') : '';
        const ratingVal = typeof rv?.rating === 'number' ? rv.rating : Number(rv?.rating ?? 0);
        return {
          id: Number(rv?.id ?? 0),
          userName: String(rv?.userName ?? rv?.user_name ?? rv?.username ?? rv?.reviewer ?? 'Anonymous'),
          rating: Number.isFinite(ratingVal) ? ratingVal : 0,
          comment: String(rv?.comment ?? rv?.text ?? ''),
          date: sanitizedDate,
        };
      })
    : [];

  // brand may come as string or brands array
  const brandStr =
    typeof api?.brand === 'string' && api.brand
      ? api.brand
      : Array.isArray(api?.brands) && api.brands.length
      ? String(api.brands[0])
      : '—';

  // sizes may come under available_sizes
  const sizesArr = Array.isArray(api?.sizes)
    ? api.sizes
    : Array.isArray(api?.available_sizes)
    ? api.available_sizes
    : [];

  // Prefer first image from images[] for consistency across endpoints; fallback to `image` when needed.
  const primaryFromArray = Array.isArray(api?.images) && api.images.length ? api.images[0] : '';
  const rawImage = primaryFromArray || (typeof api?.image === 'string' ? api.image : '');
  const imageSanitized = String(rawImage).trim().replace(/^[\'"`]+|[\'"`]+$/g, '');
  const finalImage = imageSanitized
    ? stabilizePicsum(imageSanitized, String(api?.id ?? api?.slug ?? api?.title ?? 'seed'))
    : '';

  return {
    id: Number(api?.id ?? 0),
    title: String(api?.title ?? api?.name ?? ''),
    price: Number.isFinite(priceNum) ? priceNum : 0,
    brand: brandStr,
    rating: ratingNum,
    reviewCount: reviewCountNum,
    image: finalImage,
    images: Array.isArray(api?.images) ? api.images : undefined,
    description: typeof api?.description === 'string' ? api.description : '',
    sizes: sizesArr,
    reviews,
    status: api?.status === 'inactive' ? 'inactive' : 'active',
  };
}