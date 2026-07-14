import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { workOrderTypeRepository } from "../../modules/work-order-type/work-order-type-module";

export function useGetWorkOrderTypes() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["work-order-types", companyId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data, pagination } = await workOrderTypeRepository.getWorkOrderTypes({ companyId });
      return { data, pagination };
    },
    enabled: !!companyId,
  });

  return { query };
}
