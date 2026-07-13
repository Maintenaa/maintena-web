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
import { Asset } from "@/modules/asset/dto/asset";
import { PenIcon, Trash2Icon } from "lucide-react";
import AppPaginator from "@/components/app/app-paginator";
import { StatusBadge, PriorityBadge } from "@/components/app/status-badge";
import { usePanelPath } from "@/lib/panels";

export interface AssetListProps {
  data: Asset[];
  onDelete: (asset: Asset) => void;
  page?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
}

export default function AssetList({
  data,
  onDelete,
  perPage = 10,
  page = 1,
  onPageChange,
}: AssetListProps) {
  const { panelUrl } = usePanelPath();

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: perPage,
    pageIndex: page - 1,
  });

  useEffect(() => {
    setPagination({ pageSize: perPage, pageIndex: page - 1 });
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
          return <span className="text-muted-foreground">{val || "-"}</span>;
        },
      }),
      columnHelper.accessor("model", {
        header: "Model",
        cell: (info) => {
          const val = info.getValue();
          return <span className="text-muted-foreground">{val || "-"}</span>;
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
