import { create } from 'zustand';
import type { Product } from '@/lib/types/product';

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  brand?: string;
  size?: string | null;
  qty: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size?: string | null) => void;
  removeItem: (id: string | number, size?: string | null) => void;
  updateQty: (id: string | number, qty: number, size?: string | null) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product, size = null) =>
    set((state) => {
      const idKey = `${product.id}-${size ?? 'nosize'}`;
      const existingIndex = state.items.findIndex((i) => `${i.id}-${i.size ?? 'nosize'}` === idKey);
      const priceNum = typeof product.price === 'number' ? product.price : Number(product.price);
      if (existingIndex >= 0) {
        const next = [...state.items];
        next[existingIndex] = { ...next[existingIndex], qty: next[existingIndex].qty + 1 };
        return { items: next };
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: priceNum,
            image: product.image,
            brand: product.brand,
            size,
            qty: 1,
          },
        ],
      };
    }),
  removeItem: (id, size = null) =>
    set((state) => ({ items: state.items.filter((i) => !(i.id === id && (i.size ?? null) === (size ?? null))) })),
  updateQty: (id, qty, size = null) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id && (i.size ?? null) === (size ?? null) ? { ...i, qty } : i)),
    })),
  clear: () => set({ items: [] }),
}));