"use client";

import PartList from "@/components/panel/part/part-list";
import { AppFilter } from "@/components/app/app-filter";
import { AlertConfirmDialog } from "@/components/app/confirm-dialog";
import { PanelContentHeader } from "@/components/panel/panel-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCompany } from "@/modules/company/context/company-context";
import { Part } from "@/modules/part/dto/part";
import {
  useGetPartFilter,
  useGetParts,
} from "@/modules/part/hook/use-get-parts";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

export default function Page() {
  const { currentCompany } = useCompany();

  const {
    query: { data: partsData },
  } = useGetParts({
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
  } = useGetPartFilter();

  const [deletePart, setDeletePart] = useState<Part | null>(null);

  const filteredData = useMemo(
    () =>
      (partsData?.data || []).filter(
        (p) =>
          p.name.toLowerCase().includes(search?.toLowerCase() || "") ||
          p.code.toLowerCase().includes(search?.toLowerCase() || ""),
      ),
    [partsData?.data, debouncedSearch],
  );

  return (
    <>
      <PanelContentHeader
        title="Parts"
        action={
          <Button type="button" asChild>
            <Link href="/parts/create">
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
              searchPlaceholder="Search parts by name or code..."
              perPage={perPage}
              setPerPage={setPerPage}
            />

            <PartList
              data={filteredData}
              onDelete={(data) => {
                setDeletePart(data);
              }}
              perPage={perPage}
              page={page}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </CardContent>
      </Card>

      <AlertConfirmDialog
        title="Delete Part"
        description={`Are you sure to delete part ${deletePart?.name}`}
        open={!!deletePart}
        onOpenChange={(val) => {
          if (!val) {
            setDeletePart(null);
          }
        }}
        onConfirm={() => {}}
        confirmText="Delete"
        confirmVariant="destructive"
      />
    </>
  );
}
