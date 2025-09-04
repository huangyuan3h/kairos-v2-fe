"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";

interface HeaderTitleProps {
  title: string;
  breadcrumb?: string[];
  showBack?: boolean;
  onBack?: () => void;
}

export function HeaderTitle({
  title,
  breadcrumb,
  showBack,
  onBack,
}: HeaderTitleProps) {
  return (
    <div className="flex items-center space-x-4">
      {showBack ? (
        <button
          type="button"
          aria-label="Back"
          className="p-1 rounded hover:bg-gray-100 active:bg-gray-200"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
      ) : null}
      <div>
        {breadcrumb && breadcrumb.length > 0 ? (
          <div className="flex items-center space-x-2">
            {breadcrumb.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-sm text-gray-500">{item}</span>
                {index < breadcrumb.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                )}
              </div>
            ))}
            <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
        ) : (
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        )}
      </div>
    </div>
  );
}
