"use client";
import type { ReactNode } from "react";
import { Star, StarHalf } from "lucide-react";

function RatingStars({ value }: { value: number }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const total = 5;
  const stars: ReactNode[] = [];
  for (let i = 0; i < full; i++) stars.push(<Star key={`f-${i}`} className="h-4 w-4 fill-[#FF981F] text-[#FF981F]" />);
  if (hasHalf) stars.push(<StarHalf key="h" className="h-4 w-4 text-[#FF981F]" />);
  for (let i = stars.length; i < total; i++) stars.push(<Star key={`e-${i}`} className="h-4 w-4 text-gray-300" />);
  return <div className="flex items-center gap-1">{stars}</div>;
}

export default function Reviews({
  reviews,
}: {
  reviews: Array<{
    id: string | number;
    userName?: string;
    rating: number;
    comment?: string;
    date: string | number | Date;
  }>;
}) {
  const firstThree = reviews.slice(0, 3);
  const rest = reviews.slice(3);

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Reviews</div>
        {/* Button that behaves like a link; toggles a collapsible */}
        {/* We keep layout stable and animate height for smoothness */}
        <button
          type="button"
          className="text-xs font-medium text-[#0C4B54]"
          onClick={() => {
            const el = document.getElementById("all-reviews");
            if (!el) return;
            const isOpen = el.dataset.open === "true";
            el.dataset.open = isOpen ? "false" : "true";
            el.classList.toggle("max-h-0", isOpen);
            el.classList.toggle("max-h-[1200px]", !isOpen);
            el.classList.toggle("opacity-0", isOpen);
            el.classList.toggle("opacity-100", !isOpen);
            el.classList.toggle("pointer-events-none", isOpen);
            el.classList.toggle("pointer-events-auto", !isOpen);
          }}
          aria-controls="all-reviews"
          aria-expanded={false}
        >
          View All
        </button>
      </div>

      {/* First three reviews (always visible) */}
      <ul className="mt-2 space-y-3">
        {firstThree.map((r, i) => (
          <li key={`${r.id}-${i}`} className="rounded-lg p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                {r.userName?.charAt(0)?.toUpperCase() ?? "?"}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-gray-900">{r.userName}</div>
                  <div className="flex items-center gap-2">
                    <RatingStars value={r.rating} />
                    <span className="text-xs text-gray-600">{r.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{new Date(r.date).toLocaleDateString()}</div>
              </div>
            </div>
            {/* Description starts directly below avatar row, full width without left gap */}
            <div className="mt-1 text-sm text-[#8F959E]">{r.comment}</div>
          </li>
        ))}
      </ul>

      {/* Collapsible rest (animated height, opacity, and pointer-events) */}
      <ul
        id="all-reviews"
        data-open="false"
        className="mt-2 max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out pointer-events-none space-y-3"
      >
        {rest.map((r, i) => (
          <li key={`more-${r.id}-${i}`} className="rounded-lg p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                {r.userName?.charAt(0)?.toUpperCase() ?? "?"}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-gray-900">{r.userName}</div>
                  <div className="flex items-center gap-2">
                    <RatingStars value={r.rating} />
                    <span className="text-xs text-gray-600">{r.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{new Date(r.date).toLocaleDateString()}</div>
              </div>
            </div>
            {/* Description starts directly below avatar row, full width without left gap */}
            <div className="mt-1 text-sm text-[#8F959E]">{r.comment}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}