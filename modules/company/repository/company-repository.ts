import {
  ApiResponse,
  PaginatedApiResponse,
} from "@/modules/shared/dto/api_response";
import { Company } from "../dto/company";
import { api } from "@/network/api";
import { GetCompaniesRequest } from "../dto/get-companies";
import { defaultPaginationRequest } from "@/modules/shared/constant/pagination";

export class CompanyRepository {
  async getCompanies(
    req: GetCompaniesRequest = { pagination: defaultPaginationRequest },
  ): Promise<PaginatedApiResponse<Company[]>> {
    const { data } = await api.client.get("/companies", { params: req });
    return data;
  }

  async getCompanyById(companyId: string): Promise<ApiResponse<Company>> {
    const { data } = await api.client.get(`/companies/${companyId}`);
    return data;
  }
}
