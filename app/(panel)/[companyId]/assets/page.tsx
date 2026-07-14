"use client";

import AssetList from "@/components/panel/asset/asset-list";
import { AppFilter, AppFilterOther } from "@/components/app/app-filter";
import { AlertConfirmDialog } from "@/components/app/confirm-dialog";
import { PanelContentHeader } from "@/components/panel/panel-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Asset } from "@/modules/asset/dto/asset";
import { useGetAssetFilter, useGetAssets } from "@/hooks/asset/use-get-assets";
import { useDeleteAsset } from "@/hooks/asset/use-delete-asset";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePanelContext } from "@/components/panel/panel-provider";
import AssetCategorySelect from "@/components/form/asset-category-select";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();

  useEffect(() => {
    setBreadcrumbs([["Assets"]]);
  }, []);

  const {
    query: { data: assetsData },
  } = useGetAssets();

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
  const { mutation: deleteAssetMutation } = useDeleteAsset();

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
            <Link href="./assets/create">
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
              other={
                <AppFilterOther onReset={() => {}} onApply={() => {}}>
                  <AssetCategorySelect />
                </AppFilterOther>
              }
            />

            <AssetList
              data={filteredData}
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
        onConfirm={async () => {
          if (!deleteAsset) return;
          try {
            await deleteAssetMutation.mutateAsync(deleteAsset.id);
            toast.success("Asset deleted successfully");
            setDeleteAsset(null);
          } catch (err) {
            toast.error(getErrorMessage(err));
          }
        }}
        confirmText="Delete"
        confirmVariant="destructive"
      />
    </>
  );
}
