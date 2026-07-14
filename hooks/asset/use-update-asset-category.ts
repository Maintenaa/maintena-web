import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assetRepository } from "../../modules/asset/asset-module";

export function useUpdateAssetCategory() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      categoryId,
      name,
    }: {
      categoryId: string;
      name: string;
    }) => {
      if (!companyId) throw new Error("companyId is required");
      return assetRepository.updateAssetCategory({ companyId, categoryId, name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["asset-categories", companyId],
      });
    },
  });

  return { mutation };
}
