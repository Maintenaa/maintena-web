"use client";

import { usePanelContext } from "@/components/panel/panel-provider";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();

  useEffect(() => {
    setBreadcrumbs([["Dashboard"]]);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card className="aspect-video rounded-xl bg-card" />
        <Card className="aspect-video rounded-xl bg-card" />
        <Card className="aspect-video rounded-xl bg-card" />
      </div>
      <Card className="min-h-screen rounded-xl bg-card" />
    </div>
  );
}
