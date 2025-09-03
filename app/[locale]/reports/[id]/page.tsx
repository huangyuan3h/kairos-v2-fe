"use client";

import { useParams, useRouter } from "next/navigation";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReportDetail } from "@/lib/hooks/useReports";

export default function ReportDetailPage() {
  const params = useParams<{ locale: string; id: string }>();
  const locale = params?.locale ?? "en";
  const id = params?.id ?? "";
  const router = useRouter();

  const { data, isLoading, error, mutate } = useReportDetail({ id });

  const isNotFound =
    typeof error === "object" && error && (error as any).status === 404;

  return (
    <Layout locale={locale} pageName="report-detail">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Report Detail
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/${locale}/reports`)}
            >
              Back to List
            </Button>
            <Button variant="outline" onClick={() => void mutate()}>
              Refresh
            </Button>
          </div>
        </div>

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
            <Button onClick={() => void mutate()}>Retry</Button>
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
                <span className="mr-4">As of: {formatDate(data.asOfDate)}</span>
                <span>Created: {formatDateTime(data.createdAt)}</span>
              </div>
              <article className="prose max-w-none whitespace-pre-wrap break-words">
                {data.content}
              </article>
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

function formatDateTime(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toISOString().replace("T", " ").slice(0, 19);
}
