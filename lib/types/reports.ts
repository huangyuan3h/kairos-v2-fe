export type ReportType = "overall";

export interface ReportSummary {
  id: string;
  title: string;
  asOfDate: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface ReportDetail extends ReportSummary {
  content: string;
}

export interface ReportListResponse {
  reports: ReportSummary[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
