import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kairos - Investment Management",
  description: "AI-powered investment management and advisory platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="font-sans">{children}</body>
    </html>
  );
}
