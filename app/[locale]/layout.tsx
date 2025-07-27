import { notFound } from "next/navigation";

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
    <div data-locale={locale} lang={locale}>
      {children}
    </div>
  );
}
