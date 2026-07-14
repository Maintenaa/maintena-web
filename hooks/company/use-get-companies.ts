import { useDebouncedState } from "@/hooks/use-debounced-state";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { companyRepository } from "../../modules/company/company-module";

export function useGetCompanies() {
  const [q, setQ] = useState<string | undefined>(undefined);
  const [debouncedQ] = useDebouncedState(q);
  const [ownerId, setOwnerId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = useQuery({
    queryKey: ["companies", ownerId, debouncedQ, page, limit],
    queryFn: async () => {
      const { data, pagination } = await companyRepository.getCompanies({
        q: debouncedQ,
        ownerId,
        pagination: { page, limit },
      });

      return { data, pagination };
    },
  });

  return {
    query,
    q,
    setQ,
    ownerId,
    setOwnerId,
    page,
    setPage,
    limit,
    setLimit,
  };
}
