import { PaginationRequest } from "@/modules/shared/dto/pagination";

export interface GetCompaniesRequest {
  ownerId?: string;
  q?: string;
  pagination: PaginationRequest;
}
