import { createContext, useContext } from "react";
import { Company } from "../dto/company";

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
