"use client";

import { useState } from "react";

interface Faq {
  question: string;
  answer: string;
}

interface FaqListProps {
  faqs: Faq[];
}

export function FaqList({ faqs }: FaqListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!faqs || faqs.length === 0) return null;

  const displayLimit = 3;
  const showMoreButton = faqs.length > displayLimit;
  const visibleFaqs = isExpanded ? faqs : faqs.slice(0, displayLimit);

  return (
    <div>
      <div className="space-y-3 max-w-3xl mx-auto">
        {visibleFaqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Question Header */}
            <summary className="flex items-center justify-between p-3.5 font-bold text-blue-900 list-none [&::-webkit-details-marker]:hidden select-none">
              <div className="flex items-center gap-2.5">
                <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-600 font-bold text-xs">
                  Q
                </span>
                <span className="text-sm md:text-base font-semibold text-slate-900">{faq.question}</span>
              </div>

              {/* Animated Plus / Minus Icon */}
              <div className="relative flex-shrink-0 ml-3 w-4 h-4 text-blue-500">
                {/* Plus Icon (Visible when closed) */}
                <svg
                  className="absolute inset-0 w-4 h-4 opacity-100 group-open:opacity-0 transition-opacity duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                {/* Minus Icon (Visible when open) */}
                <svg
                  className="absolute inset-0 w-4 h-4 opacity-0 group-open:opacity-100 transition-opacity duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
              </div>
            </summary>

            {/* Answer Content */}
            <div className="px-3.5 pb-3.5 pt-1 text-slate-800 text-sm md:text-base leading-relaxed sm:pl-12">
              <div className="border-l-2 border-blue-100 pl-3">
                {faq.answer}
              </div>
            </div>
          </details>
        ))}
      </div>

      {showMoreButton && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-1 text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer select-none flex items-center gap-1.5"
          >
            {isExpanded ? (
              <>
                See Less
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </>
            ) : (
              <>
                See More (+{faqs.length - displayLimit})
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
