import { apiGet } from "./client";
import type {
  ReportDetail,
  ReportListResponse,
  ReportType,
} from "../types/reports";

export async function fetchReportSummaries(params?: {
  type?: ReportType;
  currentPage?: number;
  pageSize?: number;
}): Promise<ReportListResponse> {
  return apiGet<ReportListResponse>("/reports", {
    type: params?.type ?? "overall",
    currentPage: params?.currentPage ?? 1,
    pageSize: params?.pageSize ?? 10,
  });
}

export async function fetchReportById(params: {
  id: string;
  type?: ReportType;
}): Promise<ReportDetail> {
  const { id, type } = params;
  return apiGet<ReportDetail>(`/reports/${encodeURIComponent(id)}`, {
    type: type ?? "overall",
  });
}
