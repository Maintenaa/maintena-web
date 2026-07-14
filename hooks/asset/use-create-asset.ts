import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assetRepository } from "../../modules/asset/asset-module";
import { CreateAssetRequest } from "../../modules/asset/dto/create-asset";

export function useCreateAsset() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-asset", companyId],
    mutationFn: async (params: Omit<CreateAssetRequest, "companyId">) => {
      if (!companyId) throw new Error("companyId is required");
      return assetRepository.createAsset({ ...params, companyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets", companyId] });
    },
  });

  return { mutation };
}
