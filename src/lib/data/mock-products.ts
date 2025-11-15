import type { Product } from '@/lib/types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Running Shoes Pro',
    price: 89.99,
    brand: 'Nike',
    rating: 4.5,
    reviewCount: 124,
    image: '',
    status: 'active',
  },
  {
    id: 2,
    title: 'Street Sneakers',
    price: 59.0,
    brand: 'Adidas',
    rating: 4.2,
    reviewCount: 87,
    image: '',
    status: 'active',
  },
  {
    id: 3,
    title: 'Trail Runner',
    price: 120.5,
    brand: 'Puma',
    rating: 4.8,
    reviewCount: 203,
    image: '',
    status: 'active',
  },
  {
    id: 4,
    title: 'Classic Leather',
    price: 75.0,
    brand: 'Reebok',
    rating: 4.0,
    reviewCount: 45,
    image: '',
    status: 'active',
  },
];