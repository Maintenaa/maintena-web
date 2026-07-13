"use client";

import { AppTable, AppTableActions } from "@/components/app/app-table";
import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Part } from "@/modules/part/dto/part";
import { PenIcon, Trash2Icon } from "lucide-react";
import AppPaginator from "@/components/app/app-paginator";
import { usePanelPath } from "@/lib/panels";

export interface PartListProps {
  data: Part[];
  onDelete: (part: Part) => void;
  page?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
}

export default function PartList({
  data,
  onDelete,
  perPage = 10,
  page = 1,
  onPageChange,
}: PartListProps) {
  const { panelUrl } = usePanelPath();

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: perPage,
    pageIndex: page - 1,
  });

  useEffect(() => {
    setPagination({ pageSize: perPage, pageIndex: page - 1 });
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
                    onDelete(info.row.original);
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

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
  });

  return (
    <div className="space-y-4">
      <AppTable table={table} />
      <AppPaginator
        totalRecord={table.getRowCount()}
        currentPage={page}
        perPage={perPage}
        onPageChange={(page) => onPageChange?.(page)}
      />
    </div>
  );
}
