"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useReportSummaries } from "@/lib/hooks/useReports";

export function RecentReportCard() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "en";
  const router = useRouter();

  const { data, isLoading, error, mutate } = useReportSummaries({
    pageSize: 1,
  });
  const report = useMemo(() => data?.reports?.[0], [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Report</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-gray-500">Loading...</div>
        ) : error ? (
          <div className="flex items-center justify-between">
            <div className="text-red-600">Failed to load recent report</div>
            <Button size="sm" variant="outline" onClick={() => void mutate()}>
              Retry
            </Button>
          </div>
        ) : !report ? (
          <div className="text-gray-500">No reports</div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="font-medium truncate max-w-[480px]">
                {report.title}
              </div>
              <div className="text-sm text-gray-500">
                As of {formatDate(report.asOfDate)} · Created{" "}
                {formatDateTime(report.createdAt)}
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => router.push(`/${locale}/reports/${report.id}`)}
            >
              View
            </Button>
          </div>
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

function formatDateTime(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toISOString().replace("T", " ").slice(0, 19);
}
