"use client";

import PartSupplierForm from "@/components/panel/part-supplier/part-supplier-form";
import { usePanelContext } from "@/components/panel/panel-provider";
import { useEffect } from "react";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();

  useEffect(() => {
    setBreadcrumbs([["Part Suppliers", "/part-suppliers"], ["Create"]]);
  }, []);

  return <PartSupplierForm />;
}
