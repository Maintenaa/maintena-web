import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { partSupplierRepository } from "@/modules/part-supplier/part-supplier-module";

export function useGetPartSupplierById(id: string) {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["part-supplier", companyId, id],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data } = await partSupplierRepository.getPartSupplierById({ companyId, id });
      return data;
    },
    enabled: !!companyId && !!id,
  });

  return { query };
}
