"use client";

import PositionForm from "@/components/panel/position/position-form";
import { usePanelContext } from "@/components/panel/panel-provider";
import { useEffect } from "react";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();

  useEffect(() => {
    setBreadcrumbs([["Positions", "/positions"], ["Create"]]);
  }, []);

  return <PositionForm />;
}
