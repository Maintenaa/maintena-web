import { AppTable, AppTableActions } from "@/components/app/app-table";
import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { PartSupplier } from "@/modules/part-supplier/dto/part-supplier";
import { PenIcon, Trash2Icon } from "lucide-react";
import AppPaginator from "@/components/app/app-paginator";
import { usePanelPath } from "@/lib/panels";

export interface PartSupplierListProps {
  data: PartSupplier[];
  onDelete: (partSupplier: PartSupplier) => void;
  page?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
}

export default function PartSupplierList({
  data,
  onDelete,
  perPage = 10,
  page = 1,
  onPageChange,
}: PartSupplierListProps) {
  const { panelUrl } = usePanelPath();

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: perPage,
    pageIndex: page - 1,
  });

  useEffect(() => {
    setPagination({ pageSize: perPage, pageIndex: page - 1 });
  }, [page, perPage]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<PartSupplier>();

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
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: (info) => {
          const val = info.getValue();
          return <span className="text-muted-foreground">{val || "-"}</span>;
        },
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => {
          const val = info.getValue();
          return <span className="text-muted-foreground">{val || "-"}</span>;
        },
      }),
      columnHelper.accessor("address", {
        header: "Address",
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
                  url: panelUrl(`/part-suppliers/${info.row.original.id}/edit`),
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
  }, [panelUrl]);

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
