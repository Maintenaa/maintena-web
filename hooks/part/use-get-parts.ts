import { useDebouncedState } from "@/hooks/use-debounced-state";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { partRepository } from "../../modules/part/part-module";
import { useCompany } from "@/components/provider/company-provider";

export function useGetParts() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["parts", companyId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data, pagination } = await partRepository.getParts({ companyId });
      return { data, pagination };
    },
    enabled: !!companyId,
  });

  return { query };
}

export function useGetPartFilter() {
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
