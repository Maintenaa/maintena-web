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
import { Location } from "@/modules/location/dto/location";
import { PenIcon, Trash2Icon } from "lucide-react";
import AppPaginator from "@/components/app/app-paginator";

export interface LocationListProps {
  data: Location[];
  onEdit: (location: Location) => void;
  onDelete: (location: Location) => void;
  page?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
}

export default function LocationList({
  data,
  onEdit,
  onDelete,
  perPage = 10,
  page = 1,
  onPageChange,
}: LocationListProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: perPage,
    pageIndex: page - 1,
  });

  useEffect(() => {
    setPagination({ pageSize: perPage, pageIndex: page - 1 });
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
                    onEdit(info.row.original);
                  },
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
    <>
      <div className="space-y-4">
        <AppTable table={table} />
        <AppPaginator
          totalRecord={table.getRowCount()}
          currentPage={page}
          perPage={perPage}
          onPageChange={(page) => onPageChange?.(page)}
        />
      </div>
    </>
  );
}
