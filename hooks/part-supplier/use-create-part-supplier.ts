import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partSupplierRepository } from "@/modules/part-supplier/part-supplier-module";

export function useCreatePartSupplier() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-part-supplier", companyId],
    mutationFn: async (params: { name: string; phone?: string; email?: string; address?: string }) => {
      if (!companyId) throw new Error("companyId is required");
      return partSupplierRepository.createPartSupplier({ companyId, ...params });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["part-suppliers", companyId] });
    },
  });

  return { mutation };
}
