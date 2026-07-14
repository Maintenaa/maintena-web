import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assetRepository } from "../../modules/asset/asset-module";

export function useDeleteAssetCategory() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryId: string) => {
      if (!companyId) throw new Error("companyId is required");
      return assetRepository.deleteAssetCategory({ companyId, categoryId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asset-categories", companyId] });
    },
  });

  return { mutation };
}
