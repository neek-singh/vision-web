"use client";

import { useState } from "react";

interface SkillsListProps {
  skills: string[];
}

export function SkillsList({ skills }: SkillsListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!skills || skills.length === 0) return null;

  const displayLimit = 6;
  const showMoreButton = skills.length > displayLimit;
  const visibleSkills = isExpanded ? skills : skills.slice(0, displayLimit);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-4">
        {visibleSkills.map((skill, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 py-1"
          >
            <span className="text-blue-600 font-bold text-sm md:text-base leading-none select-none flex-shrink-0">
              ✓
            </span>
            <p className="font-semibold text-slate-900 text-xs md:text-sm leading-normal">
              {skill}
            </p>
          </div>
        ))}
      </div>

      {showMoreButton && (
        <div className="mt-4 flex justify-start">
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
                See More (+{skills.length - displayLimit})
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
