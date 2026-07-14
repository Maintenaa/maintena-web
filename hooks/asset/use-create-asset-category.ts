import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assetRepository } from "../../modules/asset/asset-module";

export function useCreateAssetCategory() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      if (!companyId) throw new Error("companyId is required");
      return assetRepository.createAssetCategory({ companyId, name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["asset-categories", companyId],
      });
    },
  });

  return { mutation };
}
