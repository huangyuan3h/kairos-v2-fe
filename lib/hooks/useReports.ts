"use client";

import useSWR from "swr";
import { fetchReportById, fetchReportSummaries } from "../api/reports";
import type {
  ReportDetail,
  ReportListResponse,
  ReportType,
} from "../types/reports";

const DEFAULT_TTL_MS = 45_000; // 45s

export function useReportSummaries(params?: {
  type?: ReportType;
  currentPage?: number;
  pageSize?: number;
}) {
  const key = [
    "reports",
    params?.type ?? "overall",
    params?.currentPage ?? 1,
    params?.pageSize ?? 10,
  ] as const;
  const swr = useSWR<ReportListResponse>(
    key,
    () => fetchReportSummaries(params),
    {
      revalidateOnFocus: false,
      dedupingInterval: DEFAULT_TTL_MS,
      keepPreviousData: true,
    }
  );
  return swr;
}

export function useReportDetail(params: { id: string; type?: ReportType }) {
  const { id } = params;
  const key = ["report", id, params.type ?? "overall"] as const;
  const swr = useSWR<ReportDetail>(key, () => fetchReportById(params), {
    revalidateOnFocus: false,
    dedupingInterval: DEFAULT_TTL_MS,
  });
  return swr;
}
