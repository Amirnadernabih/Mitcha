import Link from 'next/link';
import type { Product } from '@/lib/types/product';
import { Heart } from 'lucide-react';
import ProductImage from './product-image';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group mt-3">
      <Link
        href={`/products/${product.id}`}
        className="block transition"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          {product.image && (
            <ProductImage
              src={product.image}
              alt={product.title}
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />
          )}
          {/* Wishlist heart - only hoverable element over image */}
          <button
            type="button"
            aria-label="Add to wishlist"
            className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-gray-700 shadow-sm opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-2 flex-col">
        <div className="flex-1">
          <div className="line-clamp-2 text-sm font-medium text-gray-900">{product.title}</div>
        </div>
        <div className="text-sm font-semibold text-gray-900">${
          (typeof product.price === 'number' ? product.price : Number(product.price)).toFixed(2)
        }</div>
      </div>
    </div>
  );
}