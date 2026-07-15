import { useCompany } from "@/components/provider/company-provider";
import { useQuery } from "@tanstack/react-query";
import { employeeRepository } from "@/modules/employee/employee-module";
import { useState } from "react";
import { useDebouncedState } from "../use-debounced-state";

export function useGetEmployees() {
  const { currentCompany } = useCompany();
  const companyId = currentCompany?.id;

  const query = useQuery({
    queryKey: ["employees", companyId],
    queryFn: async () => {
      if (!companyId) throw new Error("companyId is required");
      const { data, pagination } = await employeeRepository.getEmployees({
        companyId,
      });
      return { data, pagination };
    },
    enabled: !!companyId,
  });

  return { query };
}

export function useGetEmployeesFilter() {
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
