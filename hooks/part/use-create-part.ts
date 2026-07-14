import { useCompany } from "@/components/provider/company-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partRepository } from "../../modules/part/part-module";
import { CreatePartRequest } from "../../modules/part/dto/create-part";

export function useCreatePart() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-part", companyId],
    mutationFn: async (params: Omit<CreatePartRequest, "companyId">) => {
      if (!companyId) throw new Error("companyId is required");
      return partRepository.createPart({ ...params, companyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts", companyId] });
    },
  });

  return { mutation };
}
