"use client";

import { useParams, useRouter } from "next/navigation";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReportDetail } from "@/lib/hooks/useReports";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";

export default function ReportDetailPage() {
  const params = useParams<{ locale: string; id: string }>();
  const locale = params?.locale ?? "en";
  const id = params?.id ?? "";
  const router = useRouter();

  const { data, isLoading, error } = useReportDetail({ id });

  const isNotFound = Boolean(
    error &&
      typeof error === "object" &&
      "status" in (error as object) &&
      // Narrow to a record with optional status
      (error as { status?: number }).status === 404
  );

  const headerTitle = data?.title ? `report - ${data.title}` : "report";

  return (
    <Layout
      locale={locale}
      pageName="report-detail"
      title={headerTitle}
      showBack
      onBack={() => router.push(`/${locale}/reports`)}
    >
      <div className="space-y-6">
        {isLoading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
            Loading...
          </div>
        ) : isNotFound ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="text-gray-900 text-lg mb-2">Report Not Found</div>
            <div className="text-gray-500 mb-4">
              The requested report does not exist.
            </div>
            <Button onClick={() => router.push(`/${locale}/reports`)}>
              Go to Reports
            </Button>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="text-red-600 mb-2">Failed to load report</div>
          </div>
        ) : !data ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
            No data
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 mb-4">
                {formatDate(data.asOfDate)}
              </div>
              <Markdown content={data.content} />
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toISOString().slice(0, 10);
}

// Removed unused date-time formatter to satisfy linter
