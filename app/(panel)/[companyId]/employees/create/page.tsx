"use client";

import EmployeeForm from "@/components/panel/employee/employee-form";
import { usePanelContext } from "@/components/panel/panel-provider";
import { useEffect } from "react";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();

  useEffect(() => {
    setBreadcrumbs([["Employees", "/employees"], ["Create"]]);
  }, []);

  return <EmployeeForm />;
}
