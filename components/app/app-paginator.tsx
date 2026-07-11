"use client";

import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export interface AppPaginatorProps {
  currentPage?: number;
  perPage?: number;
  totalRecord: number;
  onPageChange?: (page: number) => void;
}

export default function AppPaginator({
  currentPage,
  totalRecord,
  perPage = 10,
  onPageChange,
}: AppPaginatorProps) {
  const [page, setPage] = useState(currentPage || 1);
  const totalPage = Math.ceil(totalRecord / perPage);

  useEffect(() => {
    if (currentPage && currentPage !== page) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(currentPage);
    }
  }, [currentPage]);

  function handlePageChange(newPage: number) {
    setPage(newPage);
    if (onPageChange) onPageChange(newPage);
  }

  if (totalRecord <= perPage) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={[
              page <= 1 ? "text-muted-foreground pointer-events-none" : "",
            ].join("")}
            onClick={() => {
              if (page > 1) {
                handlePageChange(page - 1);
              }
            }}
          />
        </PaginationItem>
        {getPagination(page, totalPage).map((p, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              className={[
                typeof p === "string"
                  ? "text-muted-foreground pointer-events-none"
                  : "",
              ].join(" ")}
              onClick={
                typeof p === "string" ? undefined : () => handlePageChange(p)
              }
              isActive={p == page}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={[
              page >= totalPage
                ? "text-muted-foreground pointer-events-none"
                : "",
            ].join("")}
            onClick={() => {
              if (page < totalPage) {
                handlePageChange(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function getPagination(currentPage: number, totalPage: number) {
  if (totalPage <= 5) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  const pages = [];
  const delta = 2;

  pages.push(1);

  const start = Math.max(2, currentPage - delta);
  const end = Math.min(totalPage - 1, currentPage + delta);

  if (start > 2) {
    pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPage - 1) {
    pages.push("...");
  }

  if (totalPage > 1) {
    pages.push(totalPage);
  }

  return pages;
}
