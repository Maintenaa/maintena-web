"use client";

import PartSupplierForm from "@/components/panel/part-supplier/part-supplier-form";
import { usePanelContext } from "@/components/panel/panel-provider";
import { useGetPartSupplierById } from "@/hooks/part-supplier/use-get-part-supplier-by-id";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { setBreadcrumbs } = usePanelContext();

  const {
    query: { data },
  } = useGetPartSupplierById(id);

  useEffect(() => {
    setBreadcrumbs([["Part Suppliers", "/part-suppliers"], ["Edit Part Supplier"]]);
  }, []);

  if (!data) return null;

  return <PartSupplierForm partSupplier={data} />;
}
