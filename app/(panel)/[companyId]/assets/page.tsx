"use client";

import AssetList from "@/components/panel/asset/asset-list";
import { AppFilter } from "@/components/app/app-filter";
import { AlertConfirmDialog } from "@/components/app/confirm-dialog";
import { PanelContentHeader } from "@/components/panel/panel-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCompany } from "@/modules/company/context/company-context";
import { Asset } from "@/modules/asset/dto/asset";
import {
  useGetAssetFilter,
  useGetAssets,
} from "@/modules/asset/hook/use-get-assets";
import { useGetAssetCategories } from "@/modules/asset/hook/use-get-asset-categories";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

export default function Page() {
  const { currentCompany } = useCompany();

  const {
    query: { data: assetsData },
  } = useGetAssets({
    companyId: currentCompany?.id,
    enabled: !!currentCompany,
  });

  const {
    query: { data: categoriesData },
  } = useGetAssetCategories({
    companyId: currentCompany?.id,
    enabled: !!currentCompany,
  });

  const {
    page,
    setPage,
    perPage,
    setPerPage,
    search,
    setSearch,
    debouncedSearch,
  } = useGetAssetFilter();

  const [deleteAsset, setDeleteAsset] = useState<Asset | null>(null);

  const filteredData = useMemo(
    () =>
      (assetsData?.data || []).filter(
        (a) =>
          a.name.toLowerCase().includes(search?.toLowerCase() || "") ||
          a.code.toLowerCase().includes(search?.toLowerCase() || ""),
      ),
    [assetsData?.data, debouncedSearch],
  );

  return (
    <>
      <PanelContentHeader
        title="Assets"
        action={
          <Button type="button" asChild>
            <Link href="/assets/create">
              <PlusIcon className="size-4" />
              Create
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent>
          <div className="space-y-4">
            <AppFilter
              search={search}
              setSearch={setSearch}
              searchPlaceholder="Search assets by name or code..."
              perPage={perPage}
              setPerPage={setPerPage}
            />

            <AssetList
              data={filteredData}
              categories={categoriesData?.data || []}
              onDelete={(data) => {
                setDeleteAsset(data);
              }}
              perPage={perPage}
              page={page}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </CardContent>
      </Card>

      <AlertConfirmDialog
        title="Delete Asset"
        description={`Are you sure to delete asset ${deleteAsset?.name}`}
        open={!!deleteAsset}
        onOpenChange={(val) => {
          if (!val) {
            setDeleteAsset(null);
          }
        }}
        onConfirm={() => {}}
        confirmText="Delete"
        confirmVariant="destructive"
      />
    </>
  );
}
