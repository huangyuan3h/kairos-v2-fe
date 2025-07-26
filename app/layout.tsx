import "./globals.css";
import { AgentProvider } from "@/contexts/agent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AgentProvider>{children}</AgentProvider>
      </body>
    </html>
  );
}
