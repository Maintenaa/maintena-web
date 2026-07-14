import { useCompany } from "@/components/provider/company-provider";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { partSupplierRepository } from "@/modules/part-supplier/part-supplier-module";

export function useGetPartSuppliers() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["part-suppliers", companyId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data, pagination } = await partSupplierRepository.getPartSuppliers({ companyId });
      return { data, pagination };
    },
    enabled: !!companyId,
  });

  return { query };
}

export function useGetPartSupplierFilter() {
  const [search, setSearch] = useState<string>();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [debouncedSearch] = useDebouncedState(search);

  return {
    search,
    page,
    perPage,
    setSearch,
    setPage,
    setPerPage,
    debouncedSearch,
  };
}
