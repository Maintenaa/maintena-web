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
import {
  AudioLinesIcon,
  PlusIcon,
  TargetIcon,
  TicketIcon,
  TicketSlashIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { StatsCard, StatsCardProps } from "@/components/panel/stats-card";

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

  const stats = useMemo<StatsCardProps[]>(
    () => [
      {
        label: "Total Parts",
        value: (partsData?.data.length || 0).toString(),
        icon: AudioLinesIcon,
      },
      {
        label: "Active Parts",
        value: (partsData?.data.length || 0).toString(),
        icon: TicketIcon,
        variant: "success",
      },
      {
        label: "Expired Parts",
        value: (0).toString(),
        icon: TicketSlashIcon,
        variant: "warning",
      },
    ],
    [partsData?.data],
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

      <div className="mb-4 grid lg:grid-cols-3 grid-cols-1 gap-4">
        {stats.map((stat, i) => (
          <StatsCard {...stat} key={i} />
        ))}
      </div>

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
