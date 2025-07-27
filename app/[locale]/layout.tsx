import { notFound } from "next/navigation";
import "../globals.css";

const locales = ["en", "zh-CN", "fr", "es", "ja", "ko"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <div data-locale={locale}>{children}</div>
      </body>
    </html>
  );
}
