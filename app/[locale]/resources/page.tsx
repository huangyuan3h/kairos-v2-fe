import { use } from "react";
import { Layout } from "@/components/layout";
import {
  ResourceCatalogCopy,
  ResourceCatalogView,
} from "@/components/catalog";
import enMessages from "@/i18n/messages/en.json";
import zhCNMessages from "@/i18n/messages/zh-CN.json";

const messages = {
  en: enMessages,
  "zh-CN": zhCNMessages,
};

export default function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dictionary = messages[locale as keyof typeof messages] || messages.en;
  const copy =
    (dictionary.Resources as ResourceCatalogCopy | undefined) ||
    (messages.en.Resources as ResourceCatalogCopy);

  return (
    <Layout locale={locale} title={copy.title} pageName="resources">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{copy.title}</h1>
          <p className="mt-1 text-muted-foreground">{copy.description}</p>
        </div>
        <ResourceCatalogView locale={locale} copy={copy} />
      </div>
    </Layout>
  );
}

