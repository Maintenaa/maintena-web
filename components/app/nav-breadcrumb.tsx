import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import React from "react";

export type BreadcrumbItem = [label: string, path?: string | null];

interface Props {
  breadcrumbs: BreadcrumbItem[];
  basePath: string;
}

export default function NavBreadcrumb({ breadcrumbs, basePath }: Props) {
  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink asChild>
          <Link href={basePath}>
            <HomeIcon className="size-4" />
          </Link>
        </BreadcrumbLink>
        {breadcrumbs.map(([label, path], i) => (
          <React.Fragment key={i}>
            <BreadcrumbSeparator />
            {path ? (
              <BreadcrumbLink asChild>
                <Link href={path}>{label}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{label}</BreadcrumbPage>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
