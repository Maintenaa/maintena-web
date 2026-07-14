export interface UpdateWorkOrderTypeRequest {
  companyId: string;
  workOrderTypeId: string;
  name: string;
  description?: string | null;
}
