export type ReportType = "overall";

export interface ReportSummary {
  id: string;
  title: string;
  asOfDate: string; // ISO date string
  createdAt: string; // ISO date string
  type: ReportType;
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

// Raw shapes from backend (tolerate either `id` or `reportId`)
export interface ReportSummaryRaw {
  id?: string;
  reportId?: string;
  title: string;
  asOfDate: string;
  createdAt: string;
  type?: ReportType;
}

export interface ReportDetailRaw extends ReportSummaryRaw {
  content: string;
}

export interface ReportListResponseRaw {
  reports: ReportSummaryRaw[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
