'use client';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n';

export default function ExpandableText({ text, initialChars = 160 }: { text: string; initialChars?: number }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useI18n();
  if (!text) return null;
  const isLong = text.length > initialChars;
  const collapsed = text.slice(0, initialChars);

  return (
    <div>
      <p className="text-sm leading-6 text-[#8F959E]">
        {expanded || !isLong ? (
          text
        ) : (
          <>
            {collapsed}
            {' '}
            <button
              onClick={() => setExpanded(true)}
              className="inline text-sm font-medium text-[#0C4B54] underline-offset-2 hover:underline"
              aria-label="Read more"
            >
              {t('expandable.readMore')}
            </button>
          </>
        )}
      </p>
      {expanded && isLong && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-2 text-sm font-medium text-[#0C4B54]"
          aria-label="Read less"
        >
          {t('expandable.readLess')}
        </button>
      )}
    </div>
  );
}