import { useCompany } from "@/components/provider/company-provider";
import { Location } from "@/modules/location/dto/location";
import { PaginatedApiResponse } from "@/modules/shared/dto/api_response";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { api } from "@/network/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useGetLocations() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["locations", companyId],
    queryFn: async () => {
      const { data } = await api.client.get<PaginatedApiResponse<Location[]>>(
        `/companies/${companyId}/locations`,
      );
      return data;
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
