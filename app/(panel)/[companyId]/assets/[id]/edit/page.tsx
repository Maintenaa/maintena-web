"use client";

import AssetForm from "@/components/panel/asset/asset-form";
import { usePanelContext } from "@/components/panel/panel-provider";
import { useGetAssetById } from "@/hooks/asset/use-get-asset-by-id";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { setBreadcrumbs } = usePanelContext();

  const {
    query: { data },
  } = useGetAssetById(id);

  useEffect(() => {
    setBreadcrumbs([["Assets", "/assets"], ["Edit Asset"]]);
  }, []);

  if (!data) return null;

  return <AssetForm asset={data} />;
}
