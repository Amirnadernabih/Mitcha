import { useFilterStore } from '@/lib/store/filter-store';

export default function LanguageToggle() {
  const { language, setLanguage } = useFilterStore();
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
      className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs"
      aria-label="Language"
    >
      <option value="en">EN</option>
      <option value="fr">FR</option>
    </select>
  );
}