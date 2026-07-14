import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { partRepository } from "../../modules/part/part-module";

export function useGetPartById(partId: string | null) {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["part", companyId, partId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      if (!partId) throw new Error("partId is required");
      const { data } = await partRepository.getPartById({
        companyId,
        partId,
      });
      return data;
    },
    enabled: !!companyId && !!partId,
  });

  return { query };
}
