import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { assetRepository } from "../../modules/asset/asset-module";

export function useGetAssetCategories() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["asset-categories", companyId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data, pagination } = await assetRepository.getAssetCategories({ companyId });
      return { data, pagination };
    },
    enabled: !!companyId,
  });

  return { query };
}
