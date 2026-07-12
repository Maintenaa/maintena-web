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
import { AppFilter, AppFilterOther } from "@/components/app/app-filter";
import AppPaginator from "@/components/app/app-paginator";
import { StatusBadge, PriorityBadge } from "@/components/app/status-badge";
import { useGetAssetCategories } from "@/modules/asset/hook/use-get-asset-categories";
import { CategorySelect } from "@/components/app/category-select";
import { Label } from "@/components/ui/label";

export default function AssetList() {
  const { currentCompany } = useCompany();

  const {
    query: { data },
  } = useGetAssets({
    companyId: currentCompany?.id,
    enabled: !!currentCompany?.id,
  });
  const {
    query: { data: categoriesData },
  } = useGetAssetCategories({
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
        other={
          <AppFilterOther>
            <div className="space-y-2">
              <Label>Priority</Label>
              <CategorySelect
                items={["Critical", "High", "Medium", "Low"]}
                render={(item) => <span>{item}</span>}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <CategorySelect
                items={categoriesData?.data || []}
                itemToStringValue={(item) => item.name}
                render={(item) => <span>{item.name}</span>}
              />
            </div>
          </AppFilterOther>
        }
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
