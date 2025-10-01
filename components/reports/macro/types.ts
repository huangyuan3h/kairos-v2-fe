export type MacroItem = {
  symbol: string;
  name: string;
  description?: string;
  exchange?: string;
  asset_type: "index" | "stock";
  market?: string;
  status?: string;
  icon?: string; // lucide icon name
};

export type MacroCategory = {
  id: string;
  title: string;
  description?: string;
  color?: string; // tailwind color token suffix, e.g., "blue", "green"
  items: MacroItem[];
};
