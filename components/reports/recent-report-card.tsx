"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useReportSummaries } from "@/lib/hooks/useReports";

export function RecentReportCard() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "en";
  const router = useRouter();

  const { data, isLoading, error, mutate } = useReportSummaries({
    pageSize: 5,
  });
  const reports = useMemo(() => data?.reports ?? [], [data]);

  return (
    <Card>
      <CardContent>
        {isLoading ? (
          <ul className="space-y-3 py-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <li key={idx} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </li>
            ))}
          </ul>
        ) : error ? (
          <div className="flex items-center justify-between py-2">
            <div className="text-red-600">Failed to load recent reports</div>
            <Button size="sm" variant="outline" onClick={() => void mutate()}>
              Retry
            </Button>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-gray-500 py-2">No reports</div>
        ) : (
          <ul className="divide-y">
            {reports.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-4 py-3 hover:bg-gray-50 rounded-md px-2 -mx-2 cursor-pointer"
                onClick={() =>
                  router.push(`/${locale}/reports/${encodeURIComponent(r.id)}`)
                }
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="flex-1 truncate text-[15px] font-medium leading-6">
                    {r.title}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="uppercase rounded bg-blue-50 text-blue-700 px-1.5 py-0.5 text-[11px] tracking-wide">
                      {r.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(r.asOfDate)}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/${locale}/reports/${encodeURIComponent(r.id)}`
                    );
                  }}
                >
                  View
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toISOString().slice(0, 10);
}

// Note: time display removed from UI; keep helper only if needed elsewhere
