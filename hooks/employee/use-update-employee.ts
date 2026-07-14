import { useCompany } from "@/components/provider/company-provider";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { employeeRepository } from "@/modules/employee/employee-module";
import { UpdateEmployeeRequest } from "@/modules/employee/dto/update-employee";

export function useUpdateEmployee() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-employee", companyId],
    mutationFn: async (params: Omit<UpdateEmployeeRequest, "companyId">) => {
      if (!companyId) throw new Error("companyId is required");
      return employeeRepository.updateEmployee({ ...params, companyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees", companyId] });
    },
  });

  return { mutation };
}
