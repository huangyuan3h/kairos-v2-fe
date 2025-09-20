import type { TimeseriesResponse } from "@/lib/api/market";
import type { Company } from "@/lib/types/company";

export const tsStart = () => ({ type: "ts/start" } as const);
export const tsSuccess = (payload: TimeseriesResponse) =>
  ({ type: "ts/success", payload } as const);
export const tsError = (payload: string) =>
  ({ type: "ts/error", payload } as const);

export const companyStart = () => ({ type: "company/start" } as const);
export const companySuccess = (payload: Company) =>
  ({ type: "company/success", payload } as const);
export const companyError = (payload: string) =>
  ({ type: "company/error", payload } as const);

export type Action =
  | ReturnType<typeof tsStart>
  | ReturnType<typeof tsSuccess>
  | ReturnType<typeof tsError>
  | ReturnType<typeof companyStart>
  | ReturnType<typeof companySuccess>
  | ReturnType<typeof companyError>;
