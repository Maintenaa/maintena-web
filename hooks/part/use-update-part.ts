import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partRepository } from "../../modules/part/part-module";
import { UpdatePartRequest } from "../../modules/part/dto/update-part";

export function useUpdatePart() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-part", companyId],
    mutationFn: async (
      params: Omit<UpdatePartRequest, "companyId">,
    ) => {
      if (!companyId) throw new Error("companyId is required");
      return partRepository.updatePart({ ...params, companyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts", companyId] });
    },
  });

  return { mutation };
}
