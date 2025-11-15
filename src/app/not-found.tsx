import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">Page not found</h1>
      <p className="mt-2 text-sm text-gray-600">Sorry, we couldn’t find that page. Try returning to products.</p>
      <div className="mt-6">
        <Link href="/products" className="rounded-full bg-teal-700 px-4 py-3 text-sm text-white">Go to Products</Link>
      </div>
    </div>
  );
}