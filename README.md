# Shop – Next.js E‑Commerce Demo

A small demo storefront built with Next.js and Tailwind CSS. It showcases product listing, detail views, client-side filtering, an accessible size selector, and a lightweight cart store.

## Tech Stack & Versions
- Next.js: `16.0.1`
- React: `19.2.0`
- React DOM: `19.2.0`
- Tailwind CSS: `^4`
- TypeScript: `^5`
- ESLint: `^9` with `eslint-config-next@16.0.1`
- Zustand: `^5.0.8`
- Lucide React: `^0.553.0`
- Node.js: `>= 18.18` (recommend `>= 20`)

## Getting Started
1. Install dependencies:
   - `npm install`
2. Configure environment:
   - Create a `.env.local` with:
     - `NEXT_PUBLIC_API_BASE_URL=<your-api-base-url>` (example documented in `.env.example`)
3. Development:
   - `npm run dev`
   - Opens at `http://localhost:3000` (or the next free port).
4. Production preview:
   - `npm run build`
   - `npm run start` (use `-p <port>` if needed)

## Features
- Products listing with filters (Brand, Price ranges, Size, Rating, Status)
- Product detail with size selection and Add‑to‑Cart
- Client cart store using Zustand (no backend required)
- Accessible UI (ARIA labels/roles), Tailwind‑only styling
- Loading states:
  - Route-level skeletons (`app/products/loading.tsx`, `app/products/[id]/loading.tsx`)
  - Client spinner with text: “loading products now” during fetch
- Basic SEO metadata and route-level metadata

## Environment & API
- `NEXT_PUBLIC_API_BASE_URL` is used by `fetchProducts` / `fetchProductById` utilities.
- If the API is unavailable, mock data (`src/lib/data/mock-products.ts`) is used as a safe fallback.

## Project Structure (high level)
- `src/app/products/page.tsx` – Products listing page
- `src/app/products/[id]/page.tsx` – Product detail page
- `src/components/products/*` – UI components for products
- `src/components/ui/*` – Shared UI components (spinner, skeleton)
- `src/hooks/*` – Data fetching hooks (`useProducts`, `useProductDetail`)
- `src/lib/store/*` – Zustand stores (`filter-store`, `cart-store`)
- `src/lib/api/*` – API functions (fetchers)
- `src/lib/types/*` – TypeScript interfaces

## Filters
- State is managed by `src/lib/store/filter-store.ts` using Zustand.
- Visible Status filter (Active/Inactive) in `FilterModal`:
  - Updates store via `setStatus(st)` and applies to product fetch.
- URL hydration: reading `searchParams` on initial load to seed filters.

## Cart Store
- Implemented in `src/lib/store/cart-store.ts`.
- `ProductActions` (`src/components/products/product-actions.tsx`) wires Add‑to‑Cart:
  - Adds items with optional selected size.
  - De‑duplicates by `(product.id + size)` and increments quantity.
- You can read cart state anywhere via `useCartStore((s) => s.items)`.

## Loading Spinner
- Reusable component: `src/components/ui/loading-spinner.tsx`.
- Used in `src/app/products/page.tsx` whenever `useProducts()` is fetching.
- Displays an accessible spinner; text is translated via i18n.

## 404 Customization
- Add a simple custom not‑found page in `src/app/not-found.tsx` (optional).
- Recommended content: friendly message and a link back to `/products`.

## Development Notes
- Styling: Tailwind CSS only (per product requirements).
- Accessibility: Buttons, selectors, and filters include ARIA roles/labels.
- Types: strict product and filter types to prevent runtime issues.
- Build warnings: If you see “inferred workspace root due to multiple lockfiles”, ensure only one lockfile exists in your workspace.

## Scripts
- `npm run dev` – Start development server
- `npm run build` – Build production assets
- `npm run start` – Start production server

## Next Steps (Optional)
- Hook up cart store to a backend API for persistence.
- Add a visible cart icon with item count in the header.
- Improve product images and SEO metadata further.

## Environment Variables
- Copy `.env.example` to `.env.local` and fill values.
- Key variables (prefixed `NEXT_PUBLIC_`):
  - `NEXT_PUBLIC_API_BASE_URL` – Base URL for product API.
  - `NEXT_PUBLIC_DEFAULT_LANGUAGE` – Initial language (`en` or `fr`).
  - `NEXT_PUBLIC_SUPPORTED_LANGUAGES` – Comma‑separated supported languages (`en,fr`).
  - `NEXT_PUBLIC_LOCALE_FALLBACK` – Fallback language for missing strings.
  - `NEXT_PUBLIC_SITE_NAME` – Optional site label.
  - `NEXT_PUBLIC_IMAGES_BASE_URL` – Optional images CDN base.
- On Vercel, add these in Project Settings → Environment Variables and redeploy.

## Language & i18n
- Language toggle appears in the header (right side).
- Supported languages: English (`en`) and French (`fr`).
- Selected language is stored in `filter-store` and used to set `Accept-Language` for API requests.
- UI strings are translated via a lightweight dictionary (`src/lib/i18n.ts`) and applied in:
  - Header title
  - Filter modal and sort sheet
  - Loading spinner
  - Product actions (toasts, total price, button)
