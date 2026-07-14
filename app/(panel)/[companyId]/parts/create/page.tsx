"use client";

import PartForm from "@/components/panel/part/part-form";
import { usePanelContext } from "@/components/panel/panel-provider";
import { useEffect } from "react";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();

  useEffect(() => {
    setBreadcrumbs([["Parts", "/parts"], ["Create"]]);
  }, []);

  return <PartForm />;
}
