"use client";

import EmployeeList from "@/components/panel/employee/employee-list";
import { AlertConfirmDialog } from "@/components/app/confirm-dialog";
import { PanelContentHeader } from "@/components/panel/panel-content";
import { usePanelContext } from "@/components/panel/panel-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Employee } from "@/modules/employee/dto/employee";
import {
  useGetEmployees,
  useGetEmployeesFilter,
} from "@/hooks/employee/use-get-employees";
import { useDeleteEmployee } from "@/hooks/employee/use-delete-employee";
import { usePanelPath } from "@/lib/panels";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AppFilter } from "@/components/app/app-filter";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();
  const { panelUrl } = usePanelPath();
  const {
    query: { data: employeesData },
  } = useGetEmployees();
  const { search, setSearch, perPage, setPerPage } = useGetEmployeesFilter();
  const { mutation: deleteEmployeeMutation } = useDeleteEmployee();

  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    setBreadcrumbs([["Employees"]]);
  }, []);

  return (
    <>
      <PanelContentHeader
        title="Employees"
        action={
          <Button type="button" asChild>
            <Link href={panelUrl("/employees/create")}>
              <PlusIcon className="size-4" />
              Create
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent>
          <div className="space-y-4">
            <AppFilter
              search={search}
              setSearch={setSearch}
              searchPlaceholder="Search employee..."
              perPage={perPage}
              setPerPage={setPerPage}
            />

            <EmployeeList
              data={employeesData?.data || []}
              onDelete={(data) => {
                setDeleteEmployee(data);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <AlertConfirmDialog
        title="Delete Employee"
        description={`Are you sure to delete employee ${deleteEmployee?.user.name}`}
        open={!!deleteEmployee}
        onOpenChange={(val) => {
          if (!val) {
            setDeleteEmployee(null);
          }
        }}
        onConfirm={async () => {
          if (!deleteEmployee) return;
          try {
            await deleteEmployeeMutation.mutateAsync(deleteEmployee.userId);
            toast.success("Employee deleted successfully");
            setDeleteEmployee(null);
          } catch (err) {
            toast.error(getErrorMessage(err));
          }
        }}
        confirmText="Delete"
        confirmVariant="destructive"
      />
    </>
  );
}
