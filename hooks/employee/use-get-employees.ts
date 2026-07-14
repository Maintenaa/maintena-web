import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { employeeRepository } from "@/modules/employee/employee-module";

export function useGetEmployees() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["employees", companyId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data, pagination } = await employeeRepository.getEmployees({ companyId });
      return { data, pagination };
    },
    enabled: !!companyId,
  });

  return { query };
}
