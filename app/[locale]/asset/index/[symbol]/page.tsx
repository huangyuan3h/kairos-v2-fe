"use client";

import { useParams } from "next/navigation";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssetIndexPlaceholderPage() {
  const params = useParams<{ locale: string; symbol: string }>();
  const code = decodeURIComponent(params.symbol);
  const locale = decodeURIComponent(params.locale);

  return (
    <Layout locale={locale} title={code} pageName="asset" showBack>
      <Card>
        <CardHeader>
          <CardTitle>{code}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Index page is under construction.
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
