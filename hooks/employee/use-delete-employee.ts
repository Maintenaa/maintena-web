import { useCompany } from "@/components/provider/company-provider";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { employeeRepository } from "@/modules/employee/employee-module";

export function useDeleteEmployee() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-employee", companyId],
    mutationFn: async (userId: string) => {
      if (!companyId) throw new Error("companyId is required");
      return employeeRepository.deleteEmployee({ companyId, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees", companyId] });
    },
  });

  return { mutation };
}
