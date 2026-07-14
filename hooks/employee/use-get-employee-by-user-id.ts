import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { employeeRepository } from "@/modules/employee/employee-module";

export function useGetEmployeeByUserId(userId: string) {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["employee", companyId, userId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data } = await employeeRepository.getEmployeeByUserId({ companyId, userId });
      return { data };
    },
    enabled: !!companyId && !!userId,
  });

  return { query };
}
