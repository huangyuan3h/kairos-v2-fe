"use client";

import { MacroIndexCard } from "./MacroIndexCard";
import { macroCategories } from "./config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MacroIndexOverview() {
  return (
    <div className="space-y-6">
      {macroCategories.map((cat) => (
        <Card key={cat.id}>
          <CardHeader>
            <CardTitle className="text-lg">
              {cat.title}
              {cat.description ? (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {cat.description}
                </span>
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.items.map((it) => (
                <MacroIndexCard
                  key={it.symbol}
                  item={it}
                  categoryColor={cat.color}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
