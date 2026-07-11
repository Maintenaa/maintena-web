import { useQuery } from "@tanstack/react-query";
import { companyRepository } from "../company-module";

export function useGetCompanyById(companyId?: string | null) {
  const query = useQuery({
    queryKey: ["company", companyId],
    queryFn: async () => {
      if (!companyId) return;
      const { data } = await companyRepository.getCompanyById(companyId);
      return data;
    },
    enabled: !!companyId,
  });

  return {
    query,
  };
}
