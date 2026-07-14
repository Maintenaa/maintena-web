"use client";

import { Company } from "@/modules/company/dto/company";
import { useGetCompanies } from "@/hooks/company/use-get-companies";
import { useGetCompanyById } from "@/hooks/company/use-get-company-by-id";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const companyIdKey = "company-id";

interface CompanyContext {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  currentCompany?: Company | null;
  setCurrentCompany: (company: Company | null) => void;
  isLoading?: boolean;
}

export const CompanyContext = createContext({} as CompanyContext);

export function useCompany() {
  return useContext(CompanyContext);
}

export default function CompanyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);

  const {
    query: { data: companiesData, isLoading: isCompaniesLoading },
  } = useGetCompanies();
  const {
    query: { data: companyData, isLoading: isCompanyLoading },
  } = useGetCompanyById(currentCompany?.id);

  function handleSetCompany(company: Company | null) {
    if (!!company) {
      const idRegex = /\/.{8}(-.{4}){3}-.{12}/;
      if (idRegex.test(path) || path == "/") {
        const normalizedPath = path.replace(idRegex, "");
        router.replace(`/${company.id}${normalizedPath}`);
      } else {
        router.replace(`/${company.id}`);
      }
    }

    if (!company?.id) {
      return localStorage.removeItem(companyIdKey);
    }

    localStorage.setItem(companyIdKey, company?.id);
    setCurrentCompany(company);
  }

  useEffect(() => {
    if (companies.length == 0) return;

    const companyId = localStorage.getItem(companyIdKey);
    const company = companies.find((c) => c.id == companyId);

    if (company) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleSetCompany(company);
    } else {
      handleSetCompany(companies[0] || null);
    }
  }, [companies]);

  const isLoading = isCompanyLoading || isCompaniesLoading;

  useEffect(() => {
    if (isCompanyLoading || !companyData) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentCompany(companyData);
  }, [companyData, isCompanyLoading]);

  useEffect(() => {
    if (isCompaniesLoading) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompanies(companiesData?.data || []);
  }, [companiesData, isCompaniesLoading]);

  return (
    <CompanyContext.Provider
      value={{
        isLoading,
        currentCompany,
        setCurrentCompany: handleSetCompany,
        companies,
        setCompanies,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
