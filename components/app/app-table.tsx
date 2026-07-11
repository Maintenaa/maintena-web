/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { NoRecord } from "../no-record";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";

export interface AppTableProps<T> {
  table: TanstackTable<T>;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function AppTable<T>({
  table,
  emptyTitle,
  emptyDescription,
}: AppTableProps<T>) {
  if (table.getRowCount() === 0) {
    return (
      <NoRecord
        title={emptyTitle || "No records found."}
        description={emptyDescription || "There are no records to display."}
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className={[
                  (header.column.columnDef.meta as any)?.align == "right"
                    ? "text-right"
                    : "text-left",
                ].join("")}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={[
                  (cell.column.columnDef.meta as any)?.align == "right"
                    ? "text-right"
                    : "text-left",
                ].join("")}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export interface AppTableActionProps {
  actions: Array<{
    label: string;
    icon: React.ElementType;
    url?: string;
    onClick?: () => void;
    variant?: "secondary" | "destructive";
  }>;
}

export function AppTableActions({ actions }: AppTableActionProps) {
  const variantColorMaps = {
    secondary: "text-secondary-foreground hover:bg-secondary/50",
    destructive: "text-destructive hover:text-destructive",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" size="icon" variant="ghost">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, i) => (
          <DropdownMenuItem
            key={i}
            asChild
            className={[
              "flex items-center gap-2",
              action.variant ? variantColorMaps[action.variant] : "",
            ].join(" ")}
          >
            {action.onClick ? (
              <button type="button" className="w-full" onClick={action.onClick}>
                <action.icon className="size-4" />
                {action.label}
              </button>
            ) : (
              <Link href={action.url || "#"} className="w-full">
                <action.icon className="size-4" />
                {action.label}
              </Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
