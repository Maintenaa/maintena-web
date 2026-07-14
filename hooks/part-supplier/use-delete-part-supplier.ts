import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partSupplierRepository } from "@/modules/part-supplier/part-supplier-module";

export function useDeletePartSupplier() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-part-supplier", companyId],
    mutationFn: async (id: string) => {
      if (!companyId) throw new Error("companyId is required");
      return partSupplierRepository.deletePartSupplier({ companyId, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["part-suppliers", companyId] });
    },
  });

  return { mutation };
}
