export type ApiError = {
  status: number;
  message: string;
};

const DEFAULT_API_BASE_URL = "https://api.kairos-2.it-t.xyz";

function resolveApiBaseUrl(): string {
  // Highest priority: explicit public override
  const explicit = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (explicit && explicit.trim().length > 0) return explicit;

  // In development, route both server and client calls via local proxy
  // This ensures consistent behavior across SSR/CSR and avoids CORS in dev
  if (process.env.NODE_ENV === "development") {
    return "/api/proxy";
  }

  // Additionally, for client-side runtime on local hosts, prefer proxy
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".local")
    ) {
      return "/api/proxy";
    }
  }

  // Fallback to production API base
  return DEFAULT_API_BASE_URL;
}

export const API_BASE_URL: string = resolveApiBaseUrl();

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
  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // CORS is enabled on server as per spec
      // No auth headers for now
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Network error";
    const error: ApiError = { status: 0, message };
    throw error;
  }

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
