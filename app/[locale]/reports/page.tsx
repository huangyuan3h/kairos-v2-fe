"use client";

import { useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Layout } from "@/components/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useReportSummaries } from "@/lib/hooks/useReports";
import type { ReportSummary } from "@/lib/types/reports";

export default function ReportsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? "en";
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const { data, isLoading, error, mutate } = useReportSummaries({
    currentPage,
    pageSize,
  });

  const reports: ReportSummary[] = useMemo(() => data?.reports ?? [], [data]);
  const hasPrev = currentPage > 1;
  const hasNext = reports.length === pageSize;

  const onRowClick = (id: string) => {
    router.push(`/${locale}/reports/${encodeURIComponent(id)}`);
  };

  return (
    <Layout locale={locale} pageName="reports-list">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                void mutate();
              }}
            >
              Refresh
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="text-red-600 mb-2">Failed to load reports</div>
              <Button onClick={() => void mutate()}>Retry</Button>
            </div>
          ) : reports.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No reports</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>As of Date</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((r) => (
                    <TableRow
                      key={r.id}
                      className="cursor-pointer"
                      onClick={() => onRowClick(r.id)}
                    >
                      <TableCell className="max-w-[520px] truncate">
                        {r.title}
                      </TableCell>
                      <TableCell>{formatDate(r.asOfDate)}</TableCell>
                      <TableCell>{formatDateTime(r.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Page {data?.currentPage ?? currentPage}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    disabled={!hasPrev}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!hasNext}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
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
