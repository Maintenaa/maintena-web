import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partRepository } from "../../modules/part/part-module";

export function useCreatePartCategory() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      if (!companyId) throw new Error("companyId is required");
      return partRepository.createPartCategory({ companyId, name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["part-categories", companyId],
      });
    },
  });

  return { mutation };
}
