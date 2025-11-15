import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Shop',
  description: 'Browse products, filter by brand, size, price, and rating.',
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}