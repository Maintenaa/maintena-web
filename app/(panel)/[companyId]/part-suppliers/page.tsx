"use client";

import { AppFilter } from "@/components/app/app-filter";
import { AlertConfirmDialog } from "@/components/app/confirm-dialog";
import PartSupplierList from "@/components/panel/part-supplier/part-supplier-list";
import { PanelContentHeader } from "@/components/panel/panel-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PartSupplier } from "@/modules/part-supplier/dto/part-supplier";
import { useDeletePartSupplier } from "@/hooks/part-supplier/use-delete-part-supplier";
import {
  useGetPartSupplierFilter,
  useGetPartSuppliers,
} from "@/hooks/part-supplier/use-get-part-suppliers";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePanelContext } from "@/components/panel/panel-provider";
import { usePanelPath } from "@/lib/panels";
import Link from "next/link";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();
  const { panelUrl } = usePanelPath();
  const {
    query: { data: partSuppliersData },
  } = useGetPartSuppliers();

  useEffect(() => {
    setBreadcrumbs([["Part Suppliers"]]);
  }, []);

  const {
    page,
    setPage,
    perPage,
    setPerPage,
    search,
    setSearch,
    debouncedSearch,
  } = useGetPartSupplierFilter();

  const { mutation: deletePartSupplierMutation } = useDeletePartSupplier();

  const [deletePartSupplier, setDeletePartSupplier] = useState<PartSupplier | null>(null);

  const filteredData = useMemo(
    () =>
      (partSuppliersData?.data || []).filter((ps) =>
        ps.name.toLowerCase().includes(search?.toLowerCase() || ""),
      ),
    [partSuppliersData?.data, debouncedSearch],
  );

  return (
    <>
      <PanelContentHeader
        title="Part Suppliers"
        action={
          <Button type="button" asChild>
            <Link href={panelUrl("/part-suppliers/create")}>
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
              searchPlaceholder="Search part suppliers..."
              perPage={perPage}
              setPerPage={setPerPage}
            />
            <PartSupplierList
              data={filteredData}
              onDelete={(data) => {
                setDeletePartSupplier(data);
              }}
              perPage={perPage}
              page={page}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </CardContent>
      </Card>

      <AlertConfirmDialog
        title="Delete Part Supplier"
        description={`Are you sure to delete part supplier ${deletePartSupplier?.name}`}
        open={!!deletePartSupplier}
        onOpenChange={(val) => {
          if (!val) {
            setDeletePartSupplier(null);
          }
        }}
        onConfirm={async () => {
          if (!deletePartSupplier) return;
          try {
            await deletePartSupplierMutation.mutateAsync(deletePartSupplier.id);
            toast.success("Part supplier deleted successfully");
            setDeletePartSupplier(null);
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
