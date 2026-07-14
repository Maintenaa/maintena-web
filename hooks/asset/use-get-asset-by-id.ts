import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { assetRepository } from "../../modules/asset/asset-module";

export function useGetAssetById(assetId: string | null) {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["asset", companyId, assetId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      if (!assetId) throw new Error("assetId is required");
      const { data } = await assetRepository.getAssetById({
        companyId,
        assetId,
      });
      return data;
    },
    enabled: !!companyId && !!assetId,
  });

  return { query };
}
