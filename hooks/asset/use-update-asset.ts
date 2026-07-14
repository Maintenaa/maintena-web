import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assetRepository } from "../../modules/asset/asset-module";
import { UpdateAssetRequest } from "../../modules/asset/dto/update-asset";

export function useUpdateAsset() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-asset", companyId],
    mutationFn: async (
      params: Omit<UpdateAssetRequest, "companyId">,
    ) => {
      if (!companyId) throw new Error("companyId is required");
      return assetRepository.updateAsset({ ...params, companyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets", companyId] });
    },
  });

  return { mutation };
}
