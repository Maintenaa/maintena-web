import { useCompany } from "@/modules/company/context/company-context";
import { api } from "@/network/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAssetCategory() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryId: string) => {
      const { data } = await api.client.delete(
        `/companies/${companyId}/asset-categories/${categoryId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asset-categories", companyId] });
    },
  });

  return { mutation };
}
