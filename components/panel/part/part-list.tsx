"use client";

import { useCompany } from "@/modules/company/context/company-context";
import {
  useGetPartFilter,
  useGetParts,
} from "@/modules/part/hook/use-get-parts";
import { AppTable, AppTableActions } from "@/components/app/app-table";
import { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Part } from "@/modules/part/dto/part";
import { PenIcon, Trash2Icon } from "lucide-react";
import { panelUrl } from "@/lib/panels";
import { AppFilter } from "@/components/app/app-filter";
import AppPaginator from "@/components/app/app-paginator";

export default function PartList() {
  const { currentCompany } = useCompany();

  const {
    query: { data },
  } = useGetParts({
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
  } = useGetPartFilter();

  const pagination = useMemo<PaginationState>(() => {
    return {
      pageSize: perPage,
      pageIndex: page - 1,
    };
  }, [page, perPage]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Part>();

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
      columnHelper.accessor("quantity", {
        header: "Qty",
        cell: (info) => (
          <span>
            {info.getValue()} {info.row.original.unit}
          </span>
        ),
      }),
      columnHelper.accessor("cost", {
        header: "Cost",
        cell: (info) => <span>{info.getValue().toLocaleString("id-ID")}</span>,
      }),
      columnHelper.accessor("expirationDate", {
        header: "Expiration",
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className="text-muted-foreground">
              {val
                ? new Date(val).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
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
                  url: panelUrl(`/parts/${info.row.original.id}/edit`),
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
        searchPlaceholder="Search parts by name or code..."
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
