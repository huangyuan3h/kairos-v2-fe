"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, Loader2 } from "lucide-react";
import { catalogSearch, type CatalogItem } from "@/lib/api/market";

export function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useMemo(() => pathname.split("/")[1] || "en", [pathname]);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<CatalogItem[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current) return;
      if (
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (query.trim().length < 3) {
      setItems([]);
      setOpen(false);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    timerRef.current = window.setTimeout(async () => {
      try {
        const data = await catalogSearch(query.trim());
        setItems(data.items || []);
        setOpen(true);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unknown error";
        setError(message);
        setItems([]);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  function resolveAssetKind(item: CatalogItem): "stock" | "index" {
    const type = (item.asset_type || "").toString().toLowerCase();
    return type === "index" ? "index" : "stock";
  }

  function handleSelect(item: CatalogItem) {
    setOpen(false);
    setQuery("");
    const kind = resolveAssetKind(item);
    router.push(`/${locale}/asset/${kind}/${encodeURIComponent(item.symbol)}`);
  }

  return (
    <div ref={containerRef} className="relative w-64">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stocks / indices..."
            className="pl-8 h-9"
            onFocus={() => {
              if (items.length > 0 || error) setOpen(true);
            }}
          />
          {loading && (
            <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-500" />
          )}
        </div>
      </div>

      {open && (
        <div
          className={cn(
            "absolute left-0 right-0 z-50 mt-1 max-h-72 overflow-auto rounded-md border bg-white shadow-lg"
          )}
        >
          {error ? (
            <div className="px-3 py-2 text-sm text-red-600">{error}</div>
          ) : items.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">No results</div>
          ) : (
            <ul className="divide-y">
              {items.map((it) => (
                <li
                  key={`${it.symbol}-${it.market}-${it.name}`}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(it)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {it.symbol}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {it.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {it.asset_type || it.market || ""}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default HeaderSearch;
