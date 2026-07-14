import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partRepository } from "../../modules/part/part-module";

export function useUpdatePartCategory() {
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
      return partRepository.updatePartCategory({ companyId, categoryId, name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["part-categories", companyId],
      });
    },
  });

  return { mutation };
}
