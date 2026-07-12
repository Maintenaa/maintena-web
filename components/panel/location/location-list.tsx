"use client";

import { useCompany } from "@/modules/company/context/company-context";
import {
  useGetLocationFilter,
  useGetLocations,
} from "../../../modules/location/hook/use-get-locations";
import { AppTable, AppTableActions } from "@/components/app/app-table";
import { useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Location } from "@/modules/location/dto/location";
import { PenIcon, Trash2Icon } from "lucide-react";
import { panelUrl } from "@/lib/panels";
import { AppFilter } from "@/components/app/app-filter";
import AppPaginator from "@/components/app/app-paginator";
import LocationFormDialog from "./location-form-dialog";

export default function LocationList() {
  const { currentCompany } = useCompany();
  const [editLocation, setEditLocation] = useState<Location | null>(null);

  const {
    query: { data },
  } = useGetLocations({
    companyId: currentCompany?.id,
    enabled: !!currentCompany?.id,
  });
  const {
    search,
    debouncedSearch,
    page,
    perPage,
    setSearch,
    setPage,
    setPerPage,
  } = useGetLocationFilter();
  const pagination = useMemo<PaginationState>(() => {
    return {
      pageSize: perPage,
      pageIndex: page - 1,
    };
  }, [page, perPage]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Location>();

    return [
      columnHelper.accessor("id", {
        header: "No",
        cell: (info) => (
          <span className="text-muted-foreground">{info.row.index + 1}</span>
        ),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => <span className="text-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("id", {
        id: "actions",
        header: "Actions",
        meta: {
          align: "right",
        },
        cell: (info) => {
          return (
            <AppTableActions
              actions={[
                {
                  label: "Edit",
                  icon: PenIcon,
                  onClick: () => {
                    setEditLocation(info.row.original);
                  },
                },
                {
                  label: "Delete",
                  icon: Trash2Icon,
                  onClick: () => {
                    console.log("dete");
                  },
                  variant: "destructive",
                },
              ]}
            />
          );
        },
      }),
    ];
  }, []);

  const filteredData = useMemo(() => {
    return (
      data?.data.filter((d) =>
        d.name.toLowerCase().includes(debouncedSearch?.toLowerCase() || ""),
      ) || []
    );
  }, [debouncedSearch, data?.data]);

  const table = useReactTable({
    columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
  });

  if (!currentCompany) return null;

  return (
    <>
      <div className="space-y-4">
        <AppFilter
          search={search}
          setSearch={setSearch}
          perPage={perPage}
          setPerPage={setPerPage}
          searchPlaceholder="Search locations..."
        />
        <AppTable table={table} />
        <AppPaginator
          totalRecord={table.getRowCount()}
          currentPage={page}
          onPageChange={(page) => setPage(page)}
        />
      </div>

      <LocationFormDialog
        open={!!editLocation}
        onOpenChange={(val) => {
          if (!val) {
            setEditLocation(null);
          }
        }}
        location={editLocation}
      />
    </>
  );
}
