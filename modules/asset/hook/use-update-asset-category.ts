import { useCompany } from "@/modules/company/context/company-context";
import { ApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AssetCategory } from "../dto/asset-category";

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
      const { data } = await api.client.put<ApiResponse<AssetCategory>>(
        `/companies/${companyId}/asset-categories/${categoryId}`,
        { name },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["asset-categories", companyId],
      });
    },
  });

  return { mutation };
}
