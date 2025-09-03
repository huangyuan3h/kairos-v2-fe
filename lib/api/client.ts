export type ApiError = {
  status: number;
  message: string;
};

export const API_BASE_URL = "https://api.kairos-2.it-t.xyz" as const;

type QueryParams = Record<string, string | number | boolean | undefined | null>;

export function buildQuery(params?: QueryParams): string {
  if (!params) return "";
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : "";
}

export async function apiGet<T>(
  path: string,
  params?: QueryParams
): Promise<T> {
  const url = `${API_BASE_URL}${path}${buildQuery(params)}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    // CORS is enabled on server as per spec
    // No auth headers for now
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    let message = res.statusText || "Request failed";
    if (contentType.includes("application/json")) {
      try {
        const data = (await res.json()) as { message?: string };
        if (data?.message) message = data.message;
      } catch {
        // ignore JSON parse errors
      }
    } else {
      try {
        const text = await res.text();
        if (text) message = text;
      } catch {
        // ignore
      }
    }
    const error: ApiError = { status: res.status, message };
    throw error;
  }

  const data = (await res.json()) as T;
  return data;
}
