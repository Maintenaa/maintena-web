"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Employee } from "@/modules/employee/dto/employee";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import FormControl from "@/components/form/form-control";
import PositionSelect from "@/components/form/position-select";
import { SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePanelPath } from "@/lib/panels";
import { useCreateEmployee } from "@/hooks/employee/use-create-employee";
import { useUpdateEmployee } from "@/hooks/employee/use-update-employee";
import { Position } from "@/modules/position/dto/position";
import { PanelContentHeader } from "../panel-content";
import { useEffect, useState } from "react";

const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  positionId: z.string().min(1, "Position is required"),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface Props {
  employee?: Employee;
}

export default function EmployeeForm({ employee }: Props) {
  const isEditMode = !!employee;
  const router = useRouter();
  const { panelUrl } = usePanelPath();
  const { mutation: createEmployee } = useCreateEmployee();
  const { mutation: updateEmployee } = useUpdateEmployee();
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    employee?.position || null,
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: employee?.user.name || "",
      email: employee?.user.email || "",
      password: "",
      positionId: employee?.positionId || "",
    },
  });

  useEffect(() => {
    if (selectedPosition) {
      setValue("positionId", selectedPosition.id);
    } else {
      setValue("positionId", "");
    }
  }, [selectedPosition, setValue]);

  function handleNameChange(name: string) {
    if (!isEditMode && name) {
      const firstName = name.split(" ")[0];
      const autoPassword = `${firstName}1234`;
      setValue("password", autoPassword);
    }
  }

  async function onSubmit(data: EmployeeFormValues) {
    try {
      if (isEditMode) {
        await updateEmployee.mutateAsync({
          userId: employee.userId,
          name: data.name,
          email: data.email,
          positionId: data.positionId,
        });
        toast.success("Employee updated successfully");
      } else {
        await createEmployee.mutateAsync({
          name: data.name,
          email: data.email,
          password: data.password,
          positionId: data.positionId,
        });
        toast.success("Employee created successfully");
      }

      router.push(panelUrl("/employees"));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <PanelContentHeader
        title={isEditMode ? "Edit Employee" : "Create Employee"}
      />
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <FormControl
              control={control}
              name="name"
              label="Name"
              required
              render={({ field }) => (
                <Input
                  placeholder="e.g. Yusuf Mahardika"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleNameChange(e.target.value);
                  }}
                />
              )}
            />

            <FormControl
              control={control}
              name="email"
              label="Email"
              required
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="e.g. yusuf@example.com"
                  {...field}
                />
              )}
            />

            <FormControl
              control={control}
              name="password"
              label="Password"
              required
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Auto-generated from name"
                  {...field}
                  disabled={isEditMode}
                />
              )}
            />

            <FormControl
              control={control}
              name="positionId"
              label="Position"
              required
              render={() => (
                <PositionSelect
                  value={selectedPosition}
                  onValueChange={(value) => setSelectedPosition(value ?? null)}
                />
              )}
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          <SaveIcon className="size-4" />
          {isSubmitting ? "Saving...." : "Save"}
        </Button>
      </div>
    </form>
  );
}
