'use client';
import { useState, useEffect } from 'react';

export default function SizeSelector({ sizes = [], value, onChange }: { sizes?: string[]; value?: string; onChange?: (size: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (typeof value !== 'undefined') setSelected(value ?? null);
  }, [value]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Size</div>
        <button type="button" className="text-xs font-medium text-[#8F959E]">Size Guide</button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Select size">
        {sizes.map((s) => {
          const active = selected === s;
          return (
            <button
              key={s}
              onClick={() => {
                setSelected(s);
                onChange?.(s);
              }}
              aria-pressed={active}
              className={
                'rounded-md border px-3 py-2 text-xs transition-colors ' +
                (active
                  ? 'border-[#0C4B54] bg-[#0C4B54] text-white'
                  : 'border-gray-300 text-gray-700 hover:border-[#0C4B54] hover:bg-[#0C4B54] hover:text-white')
              }
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}