import type { TimeseriesResponse } from "@/lib/api/market";
import type { Company } from "@/lib/types/company";

export type State = {
  timeseries: TimeseriesResponse | null;
  company: Company | null;
  loadingTimeseries: boolean;
  loadingCompany: boolean;
  errorTimeseries: string | null;
  errorCompany: string | null;
};
