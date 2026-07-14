"use client";

import AssetForm from "@/components/panel/asset/asset-form";
import { usePanelContext } from "@/components/panel/panel-provider";
import { useEffect } from "react";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();

  useEffect(() => {
    setBreadcrumbs([["Assets", "/assets"], ["Create"]]);
  }, []);

  return <AssetForm />;
}
