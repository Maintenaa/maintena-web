import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { partRepository } from "../../modules/part/part-module";

export function useGetPartCategories() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["part-categories", companyId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data, pagination } = await partRepository.getPartCategories({ companyId });
      return { data, pagination };
    },
    enabled: !!companyId,
  });

  return { query };
}
