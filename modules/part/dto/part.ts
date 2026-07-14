import { Location } from "@/modules/location/dto/location";
import { PartCategory } from "./part-category";
import { PartSupplier } from "@/modules/part-supplier/dto/part-supplier";

export interface Part {
  id: string;
  companyId: string;
  name: string;
  code: string;
  description: string;
  categoryId: string;
  category?: PartCategory;
  locationId: string;
  location?: Location;
  quantity: number;
  unit: string;
  cost: number;
  expirationDate: string;
  supplierId: string;
  supplier?: PartSupplier;
  photo: string;
  createdAt: string;
  updatedAt: string;
}
