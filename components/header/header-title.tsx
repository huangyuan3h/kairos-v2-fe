"use client";

import { ChevronRight } from "lucide-react";

interface HeaderTitleProps {
  title: string;
  breadcrumb?: string[];
}

export function HeaderTitle({ title, breadcrumb }: HeaderTitleProps) {
  return (
    <div className="flex items-center space-x-4">
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
