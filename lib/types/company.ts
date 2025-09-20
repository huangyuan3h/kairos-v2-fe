export interface Company {
  // Primary identity
  pk: string; // canonical symbol, e.g., "SH600519"
  symbol: string; // same as pk
  name?: string | null; // display name if available

  // Scoring (used for ranking/sorting)
  score: number; // default from sync; higher is better
  gsi1pk: "SCORE";
  gsi1sk: string; // "{paddedScore}#{symbol}", e.g., "00009.900#SH600519"

  // Financial metrics (flattened, optional; present only when parsed as numbers)
  // Income statement (prefix: inc_)
  inc_revenue?: number;
  inc_operating_income?: number;
  inc_pretax_income?: number;
  inc_net_income?: number;
  inc_eps_basic?: number;
  inc_eps_diluted?: number;

  // Balance sheet (prefix: bs_)
  bs_total_assets?: number;
  bs_total_liabilities?: number;
  bs_total_equity?: number;
  bs_additional_paid_in_capital?: number;
  bs_surplus_reserve?: number;
  bs_retained_earnings?: number;

  // Cash flow (prefix: cf_)
  cf_net_cash_from_operating?: number;
  cf_net_cash_from_investing?: number;
  cf_net_cash_from_financing?: number;
  cf_cash_out_employees?: number;
  cf_cash_out_taxes?: number;
  cf_ending_cash_and_equivalents?: number;
  cf_net_increase_in_cash?: number;

  // Future-proofing
  [key: string]: unknown;
}
