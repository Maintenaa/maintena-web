export interface CreatePartRequest {
  companyId: string;
  code: string;
  name: string;
  description: string;
  categoryId: string;
  locationId: string;
  supplierId: string;
  quantity: number;
  unit: string;
  cost: number;
  expirationDate?: string;
  photo: string;
}
