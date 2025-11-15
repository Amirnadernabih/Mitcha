import { create } from 'zustand';

interface FilterState {
  brand: string | null;
  priceRanges: string[];
  sizes: string[];
  minRating: number | null;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  language: 'en' | 'fr';
  status: 'active' | 'inactive';
  setBrand: (brand: string | null) => void;
  togglePriceRange: (range: string) => void;
  toggleSize: (size: string) => void;
  setMinRating: (rating: number | null) => void;
  setSorting: (sortBy: string | null, sortOrder: 'asc' | 'desc') => void;
  setLanguage: (lang: 'en' | 'fr') => void;
  setStatus: (status: 'active' | 'inactive') => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  brand: null,
  priceRanges: [],
  sizes: [],
  minRating: null,
  sortBy: null,
  sortOrder: 'asc',
  language: (process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE as 'en' | 'fr') || 'en',
  status: 'active',
  setBrand: (brand) => set({ brand }),
  togglePriceRange: (range) =>
    set((state) => ({
      priceRanges: state.priceRanges.includes(range)
        ? state.priceRanges.filter((r) => r !== range)
        : [...state.priceRanges, range],
    })),
  toggleSize: (size) =>
    set((state) => ({
      sizes: state.sizes.includes(size)
        ? state.sizes.filter((s) => s !== size)
        : [...state.sizes, size],
    })),
  setMinRating: (rating) => set({ minRating: rating }),
  setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
  setLanguage: (lang) => set({ language: lang }),
  setStatus: (status) => set({ status }),
  clearFilters: () =>
    set({
      brand: null,
      priceRanges: [],
      sizes: [],
      minRating: null,
      sortBy: null,
      sortOrder: 'asc',
      status: 'active',
    }),
}));