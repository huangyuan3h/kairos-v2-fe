import { apiGet } from "./client";
import type {
  ReportDetail,
  ReportDetailRaw,
  ReportListResponse,
  ReportListResponseRaw,
  ReportSummary,
  ReportSummaryRaw,
  ReportType,
} from "../types/reports";

export async function fetchReportSummaries(params?: {
  type?: ReportType;
  currentPage?: number;
  pageSize?: number;
}): Promise<ReportListResponse> {
  const raw = await apiGet<ReportListResponseRaw>("/reports", {
    type: params?.type ?? "overall",
    currentPage: params?.currentPage ?? 1,
    pageSize: params?.pageSize ?? 10,
  });
  return normalizeReportList(raw);
}

export async function fetchReportById(params: {
  id: string;
  type?: ReportType;
}): Promise<ReportDetail> {
  const { id, type } = params;
  const raw = await apiGet<ReportDetailRaw>(
    `/reports/${encodeURIComponent(id)}`,
    {
      type: type ?? "overall",
    }
  );
  return normalizeReportDetail(raw);
}

function normalizeSummary(raw: ReportSummaryRaw): ReportSummary {
  const id = raw.id ?? raw.reportId ?? "";
  return {
    id,
    title: raw.title,
    asOfDate: raw.asOfDate,
    createdAt: raw.createdAt,
  };
}

function normalizeReportList(raw: ReportListResponseRaw): ReportListResponse {
  return {
    reports: raw.reports.map(normalizeSummary),
    totalCount: raw.totalCount,
    currentPage: raw.currentPage,
    pageSize: raw.pageSize,
    totalPages: raw.totalPages,
  };
}

function normalizeReportDetail(raw: ReportDetailRaw): ReportDetail {
  const base = normalizeSummary(raw);
  return {
    ...base,
    content: raw.content,
  };
}
