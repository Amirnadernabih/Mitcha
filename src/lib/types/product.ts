export interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  description?: string;
  sizes?: string[];
  reviews?: Review[];
  status: 'active' | 'inactive';
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FilterState {
  brand: string | null;
  priceRange: string[];
  sizes: string[];
  minRating: number | null;
  sortBy: 'price' | 'rating' | 'created_at' | null;
  sortOrder: 'asc' | 'desc';
}