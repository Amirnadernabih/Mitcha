import { useFilterStore } from '@/lib/store/filter-store';

export type SupportedLang = 'en' | 'fr';

type Dict = Record<string, string>;

const en: Dict = {
  'header.title': "Men's Wear",
  'loading.products': 'Loading products…',
  'filters.title': 'Sort and Filter',
  'filters.sortBy': 'Sort By',
  'filters.price': 'Price',
  'filters.size': 'Size',
  'filters.rating': 'Rating',
  'rating.lessThanThree': 'Less than 3',
  'filters.clearAll': 'Clear All',
  'filters.apply': 'Apply',
  'sort.mostRecommended': 'Most Recommended',
  'sort.priceLowFirst': 'Price Lowest First',
  'sort.priceHighFirst': 'Price Highest First',
  'sort.bestRating': 'Best Rating',
  'expandable.readMore': 'read more…',
  'expandable.readLess': 'Read Less',
  'actions.totalPrice': 'Total Price',
  'actions.withVat': 'with VAT',
  'actions.addToCart': '+ Add to Cart',
  'actions.selectSizeError': 'Please select a size before adding to cart',
  'actions.itemAdded': 'Item added to cart',
};

const fr: Dict = {
  'header.title': 'Vêtements pour hommes',
  'loading.products': 'Chargement des produits…',
  'filters.title': 'Trier et filtrer',
  'filters.sortBy': 'Trier par',
  'filters.price': 'Prix',
  'filters.size': 'Taille',
  'filters.rating': 'Note',
  'rating.lessThanThree': 'Moins de 3',
  'filters.clearAll': 'Tout effacer',
  'filters.apply': 'Appliquer',
  'sort.mostRecommended': 'Les plus recommandés',
  'sort.priceLowFirst': 'Prix du plus bas au plus haut',
  'sort.priceHighFirst': 'Prix du plus haut au plus bas',
  'sort.bestRating': 'Meilleure note',
  'expandable.readMore': 'lire la suite…',
  'expandable.readLess': 'Lire moins',
  'actions.totalPrice': 'Prix total',
  'actions.withVat': 'avec TVA',
  'actions.addToCart': '+ Ajouter au panier',
  'actions.selectSizeError': 'Veuillez sélectionner une taille avant d’ajouter au panier',
  'actions.itemAdded': 'Article ajouté au panier',
};

const dict: Record<SupportedLang, Dict> = { en, fr };

export function translate(key: string, lang: SupportedLang): string {
  const byLang = dict[lang] ?? en;
  return byLang[key] ?? en[key] ?? key;
}

export function useI18n() {
  const { language } = useFilterStore();
  return {
    lang: language,
    t: (key: string) => translate(key, language),
  };
}