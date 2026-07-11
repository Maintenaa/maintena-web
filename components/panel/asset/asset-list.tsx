"use client";

import { useCompany } from "@/modules/company/context/company-context";
import {
  useGetAssetFilter,
  useGetAssets,
} from "@/modules/asset/hook/use-get-assets";
import { AppTable, AppTableActions } from "@/components/app/app-table";
import { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Asset } from "@/modules/asset/dto/asset";
import { PenIcon, Trash2Icon } from "lucide-react";
import { panelUrl } from "@/lib/panels";
import { AppFilter } from "@/components/app/app-filter";
import AppPaginator from "@/components/app/app-paginator";
import { StatusBadge, PriorityBadge } from "@/components/app/status-badge";

export default function AssetList() {
  const { currentCompany } = useCompany();

  const {
    query: { data },
  } = useGetAssets({
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
  } = useGetAssetFilter();

  const pagination = useMemo<PaginationState>(() => {
    return {
      pageSize: perPage,
      pageIndex: page - 1,
    };
  }, [page, perPage]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Asset>();

    return [
      columnHelper.accessor("id", {
        header: "No",
        cell: (info) => (
          <span className="text-muted-foreground">{info.row.index + 1}</span>
        ),
      }),
      columnHelper.accessor("code", {
        header: "Code",
        cell: (info) => (
          <span className="font-medium text-muted-foreground">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => <span className="text-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => <StatusBadge value={info.getValue()} />,
      }),
      columnHelper.accessor("priority", {
        header: "Priority",
        cell: (info) => <PriorityBadge value={info.getValue()} />,
      }),
      columnHelper.accessor("manufacturer", {
        header: "Manufacturer",
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className="text-muted-foreground">
              {val || "-"}
            </span>
          );
        },
      }),
      columnHelper.accessor("model", {
        header: "Model",
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className="text-muted-foreground">
              {val || "-"}
            </span>
          );
        },
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
                  url: panelUrl(`/assets/${info.row.original.id}/edit`),
                },
                {
                  label: "Delete",
                  icon: Trash2Icon,
                  onClick: () => {
                    console.log("delete");
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
      data?.data.filter(
        (d) =>
          d.name.toLowerCase().includes(debouncedSearch?.toLowerCase() || "") ||
          d.code.toLowerCase().includes(debouncedSearch?.toLowerCase() || ""),
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
    <div className="space-y-4">
      <AppFilter
        search={search}
        setSearch={setSearch}
        perPage={perPage}
        setPerPage={setPerPage}
        searchPlaceholder="Search assets by name or code..."
      />
      <AppTable table={table} />
      <AppPaginator
        totalRecord={table.getRowCount()}
        currentPage={page}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}
