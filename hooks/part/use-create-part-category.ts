import { useCompany } from "@/components/provider/company-provider";
import { ApiResponse } from "@/modules/shared/dto/api_response";
import { api } from "@/network/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PartCategory } from "../../modules/part/dto/part-category";

export function useCreatePartCategory() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      const { data } = await api.client.post<ApiResponse<PartCategory>>(
        `/companies/${companyId}/part-categories`,
        { name },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["part-categories", companyId],
      });
    },
  });

  return { mutation };
}
