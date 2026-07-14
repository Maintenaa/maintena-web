import { useCompany } from "@/components/provider/company-provider";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { employeeRepository } from "@/modules/employee/employee-module";
import { CreateEmployeeRequest } from "@/modules/employee/dto/create-employee";

export function useCreateEmployee() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-employee", companyId],
    mutationFn: async (params: Omit<CreateEmployeeRequest, "companyId">) => {
      if (!companyId) throw new Error("companyId is required");
      return employeeRepository.createEmployee({ ...params, companyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees", companyId] });
    },
  });

  return { mutation };
}
