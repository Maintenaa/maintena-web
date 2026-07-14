import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workOrderTypeRepository } from "../../modules/work-order-type/work-order-type-module";

export function useDeleteWorkOrderType() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (workOrderTypeId: string) => {
      if (!companyId) throw new Error("companyId is required");
      return workOrderTypeRepository.deleteWorkOrderType({ companyId, workOrderTypeId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-order-types", companyId] });
    },
  });

  return { mutation };
}
