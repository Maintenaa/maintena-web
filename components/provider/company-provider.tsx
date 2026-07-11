"use client";

import { CompanyContext } from "@/modules/company/context/company-context";
import { Company } from "@/modules/company/dto/company";
import { useGetCompanies } from "@/modules/company/hooks/use-get-companies";
import { useGetCompanyById } from "@/modules/company/hooks/use-get-company-by-id";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const companyIdKey = "company-id";

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
      const normalizedPath = path.replace(/\/.{8}(-.{4}){3}-.{12}/, "");
      router.push(`/${company.id}${normalizedPath}`);
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
