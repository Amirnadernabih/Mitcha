import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchProductById, fetchProducts } from '@/lib/api/products'
import type { Product } from '@/lib/types/product'
import { MOCK_PRODUCTS } from '@/lib/data/mock-products'
import ProductActions from '@/components/products/product-actions'
import ExpandableText from '@/components/ui/expandable-text'
import { ArrowLeft, Star, StarHalf } from 'lucide-react'
import type { ReactNode } from 'react'
import CartButtonSheet from '@/components/cart/cart-button-sheet'
import ProductImage from '@/components/products/product-image'
import Reviews from '@/components/products/reviews'

function RatingStars({ value }: { value: number }) {
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.5
  const total = 5
  const stars: ReactNode[] = []
  for (let i = 0; i < full; i++) stars.push(<Star key={`f-${i}`} className="h-4 w-4 fill-[#FF981F] text-[#FF981F]" />)
  if (hasHalf) stars.push(<StarHalf key="h" className="h-4 w-4 text-[#FF981F]" />)
  for (let i = stars.length; i < total; i++) stars.push(<Star key={`e-${i}`} className="h-4 w-4 text-gray-300" />)
  return <div className="flex items-center gap-1">{stars}</div>
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) {
    notFound();
  }
  let product: Product | null = null;

  try {
    const data = await fetchProductById(id, 'en');
    product = data;
  } catch (_) {}

  if (!product) {
    try {
      const list = await fetchProducts({ language: 'en' });
      product = list.find((p) => String(p.id) === String(id)) ?? null;
    } catch (_) {}
  }

  if (!product) {
    product = MOCK_PRODUCTS.find((p) => String(p.id) === String(id)) || null;
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link href="/products" className="text-sm text-teal-700">← Back to products</Link>
        <div className="mt-6 text-sm text-gray-600">Product is unavailable right now. Please try again later.</div>
      </div>
    );
  }

  const priceNum = typeof product.price === 'number' ? product.price : Number(product.price)
  const priceDisplay = priceNum.toFixed(2)

  return (
    <div className="mx-auto max-w-4xl px-4 pb-28 py-4" style={{ paddingTop: 'inherit' }}>
      {/* Full-bleed top image on mobile (no side gaps) */}
      <div className="relative -mx-4 h-[280px] w-auto overflow-hidden rounded-none bg-gray-100 sm:mx-0 sm:h-[360px] sm:rounded-xl">
        {product.image ? (
          <ProductImage src={product.image} alt={product.title} className="h-full w-full object-cover" priority />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
        <div className="pointer-events-none absolute left-0 right-0 top-0 flex items-start justify-between p-3">
          <Link href="/products" aria-label="Back" className="pointer-events-auto rounded-full bg-white p-2 shadow">
            <ArrowLeft className="h-5 w-5 text-gray-900" />
          </Link>
          <CartButtonSheet
            variant="minimal"
            triggerClassName="pointer-events-auto rounded-full bg-white p-2 shadow"
          />
        </div>
      </div>

      {/* Thumbnail row */}
      <div className="mt-3 grid grid-cols-4 gap-3">
        {[0,1,2,3].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-gray-200" />
        ))}
      </div>

      {/* Product info row */}
      <div className="mt-4 grid grid-cols-2 items-start">
        <div>
          <div className="text-xs font-medium text-[#8F959E]">{product.brand}</div>
          <div className="mt-1 text-lg font-semibold text-gray-900">{product.title}</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-medium text-[#8F959E]">Price</div>
          <div className="mt-1 text-lg font-semibold text-gray-900">${priceDisplay}</div>
        </div>
      </div>

      {/* Rating row */}
      <div className="mt-2 flex items-center gap-2">
        <RatingStars value={product.rating} />
        <span className="text-xs text-gray-600">{product.rating.toFixed(1)} • {product.reviewCount} reviews</span>
      </div>

      {/* Size, Description */}
      <ProductActions product={product} />

      {product.description && (
        <div className="mt-6">
          <div className="text-sm font-medium">Description</div>
          <ExpandableText text={product.description} />
        </div>
      )}

      {/* Reviews with smooth collapsible */}
      {Array.isArray(product.reviews) && product.reviews.length > 0 && (
        <Reviews reviews={product.reviews} />
      )}
    </div>
  )
}