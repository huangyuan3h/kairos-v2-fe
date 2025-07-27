import { NavItem, Language } from "./types";

export const navItems: NavItem[] = [
  {
    icon: "Home",
    label: "Dashboard",
    href: "/",
    active: true,
  },
  { icon: "PieChart", label: "Portfolio", href: "/portfolio" },
  { icon: "Users", label: "Users", href: "/users" },
  {
    icon: "FileText",
    label: "Documents",
    href: "/documents",
  },
  {
    icon: "BarChart3",
    label: "Analytics",
    href: "/analytics",
  },
  {
    icon: "Settings",
    label: "Settings",
    href: "/settings",
  },
];

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  {
    code: "zh-CN",
    name: "Chinese (Simplified)",
    nativeName: "中文（简体）",
    flag: "🇨🇳",
  },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
];
