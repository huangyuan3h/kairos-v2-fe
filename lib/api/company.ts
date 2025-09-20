import { apiGet } from "./client";
import type { Company } from "../types/company";

export async function getCompany(params: { code: string }): Promise<Company> {
  const code = params.code?.toString().trim().toUpperCase();
  if (!code) {
    throw new Error("code is required");
  }
  return await apiGet<Company>("/company", { code });
}
