import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assetRepository } from "../../modules/asset/asset-module";

export function useDeleteAsset() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (assetId: string) => {
      if (!companyId) throw new Error("companyId is required");
      return assetRepository.deleteAsset({ companyId, assetId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets", companyId] });
    },
  });

  return { mutation };
}
