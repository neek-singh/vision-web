"use client";

import { useState } from "react";

interface Tool {
  name: string;
}

interface ToolsListProps {
  tools: Tool[];
}

function getToolBadgeStyle(name: string) {
  const cleanName = name.toLowerCase().trim();
  if (cleanName.includes("word")) {
    return "border-blue-200 bg-blue-50/40 hover:bg-blue-100/60 hover:border-blue-400";
  }
  if (cleanName.includes("excel")) {
    return "border-emerald-200 bg-emerald-50/40 hover:bg-emerald-100/60 hover:border-emerald-400";
  }
  if (cleanName.includes("powerpoint") || cleanName.includes("power point")) {
    return "border-orange-200 bg-orange-50/40 hover:bg-orange-100/60 hover:border-orange-400";
  }
  if (cleanName.includes("vs code") || cleanName.includes("vscode") || cleanName.includes("visual studio code")) {
    return "border-sky-200 bg-sky-50/40 hover:bg-sky-100/60 hover:border-sky-400";
  }
  if (cleanName.includes("tally")) {
    return "border-teal-200 bg-teal-50/40 hover:bg-teal-100/60 hover:border-teal-400";
  }
  if (cleanName.includes("canva")) {
    return "border-purple-200 bg-purple-50/40 hover:bg-purple-100/60 hover:border-purple-400";
  }
  if (cleanName.includes("notion")) {
    return "border-slate-300 bg-slate-50/40 hover:bg-slate-100 hover:border-slate-500";
  }
  if (cleanName.includes("gmail") || cleanName.includes("mail")) {
    return "border-red-200 bg-red-50/40 hover:bg-red-100/60 hover:border-red-400";
  }
  if (cleanName.includes("chrome") || cleanName.includes("google chrome")) {
    return "border-amber-200 bg-amber-50/40 hover:bg-amber-100/60 hover:border-amber-400";
  }
  if (cleanName.includes("html")) {
    return "border-orange-200 bg-orange-50/40 hover:bg-orange-100/60 hover:border-orange-400";
  }
  if (cleanName.includes("css")) {
    return "border-blue-200 bg-blue-50/40 hover:bg-blue-100/60 hover:border-blue-400";
  }
  if (cleanName.includes("javascript") || cleanName.includes("js")) {
    return "border-yellow-200 bg-yellow-50/40 hover:bg-yellow-100/60 hover:border-yellow-400";
  }
  if (cleanName.includes("python")) {
    return "border-blue-200 bg-blue-50/40 hover:bg-blue-100/60 hover:border-blue-400";
  }
  if (cleanName.includes("photoshop")) {
    return "border-cyan-200 bg-cyan-50/40 hover:bg-cyan-100/60 hover:border-cyan-400";
  }
  if (cleanName.includes("illustrator")) {
    return "border-amber-200 bg-amber-50/40 hover:bg-amber-100/60 hover:border-amber-400";
  }
  if (cleanName.includes("slack")) {
    return "border-purple-200 bg-purple-50/40 hover:bg-purple-100/60 hover:border-purple-400";
  }
  if (cleanName.includes("youtube")) {
    return "border-red-200 bg-red-50/40 hover:bg-red-100/60 hover:border-red-400";
  }
  if (cleanName.includes("drive")) {
    return "border-green-200 bg-green-50/40 hover:bg-green-100/60 hover:border-green-400";
  }
  return "border-slate-200 bg-slate-50/40 hover:bg-slate-100 hover:border-slate-400";
}

export function ToolsList({ tools }: ToolsListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!tools || tools.length === 0) return null;

  const displayLimit = 6;
  const showMoreButton = tools.length > displayLimit;
  const visibleTools = isExpanded ? tools : tools.slice(0, displayLimit);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 justify-start">
        {visibleTools.map((tool, idx) => (
          <span
            key={idx}
            className={`px-5 py-2 text-xs md:text-sm font-semibold border rounded-full transition-all duration-300 cursor-default shadow-sm select-none text-slate-900 ${getToolBadgeStyle(tool.name)}`}
          >
            {tool.name}
          </span>
        ))}

        {showMoreButton && (
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
                See More (+{tools.length - displayLimit})
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
        )}
      </div>
    </div>
  );
}
