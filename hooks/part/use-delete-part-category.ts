import { useCompany } from "@/components/provider/company-provider";
import { api } from "@/network/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePartCategory() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryId: string) => {
      const { data } = await api.client.delete(
        `/companies/${companyId}/part-categories/${categoryId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["part-categories", companyId] });
    },
  });

  return { mutation };
}
