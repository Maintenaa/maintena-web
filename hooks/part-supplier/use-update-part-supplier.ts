import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partSupplierRepository } from "@/modules/part-supplier/part-supplier-module";

export function useUpdatePartSupplier() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-part-supplier", companyId],
    mutationFn: async (params: { id: string; name: string; phone?: string; email?: string; address?: string }) => {
      if (!companyId) throw new Error("companyId is required");
      return partSupplierRepository.updatePartSupplier({
        companyId,
        id: params.id,
        name: params.name,
        phone: params.phone,
        email: params.email,
        address: params.address,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["part-suppliers", companyId] });
    },
  });

  return { mutation };
}
