"use client";

import EmployeeForm from "@/components/panel/employee/employee-form";
import { usePanelContext } from "@/components/panel/panel-provider";
import { useGetEmployeeByUserId } from "@/hooks/employee/use-get-employee-by-user-id";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();
  const params = useParams<{ userId: string }>();
  const {
    query: { data: employeeData },
  } = useGetEmployeeByUserId(params.userId);

  useEffect(() => {
    setBreadcrumbs([["Employees", "/employees"], ["Edit"]]);
  }, []);

  return <EmployeeForm employee={employeeData?.data} />;
}
