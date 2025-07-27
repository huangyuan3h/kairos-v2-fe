"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface NavigationContextType {
  isOpen: boolean;
  navWidth: number;
  toggleNav: () => void;
  setOpen: (open: boolean) => void;
}

const NAV_WIDTH_OPEN = 256; // px
const NAV_WIDTH_CLOSED = 80; // px

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const navWidth = isOpen ? NAV_WIDTH_OPEN : NAV_WIDTH_CLOSED;

  const toggleNav = useCallback(() => setIsOpen((v) => !v), []);
  const setOpen = useCallback((open: boolean) => setIsOpen(open), []);

  return (
    <NavigationContext.Provider
      value={{ isOpen, navWidth, toggleNav, setOpen }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error("useNavigation must be used within a NavigationProvider");
  return ctx;
}
