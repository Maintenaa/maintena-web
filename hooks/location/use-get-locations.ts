import { useCompany } from "@/components/provider/company-provider";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { locationRepository } from "../../modules/location/location-module";

export function useGetLocations() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["locations", companyId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data, pagination } = await locationRepository.getLocations({ companyId });
      return { data, pagination };
    },
    enabled: !!companyId,
  });

  return { query };
}

export function useGetLocationFilter() {
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
