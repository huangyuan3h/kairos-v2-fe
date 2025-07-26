export interface NavItem {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface NavigationProps {
  className?: string;
}
