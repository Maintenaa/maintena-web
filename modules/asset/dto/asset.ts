import { Location } from "@/modules/location/dto/location";
import { AssetCategory } from "./asset-category";

export type AssetStatus =
  | "operational"
  | "inMaintenance"
  | "underRepair"
  | "outOfService"
  | "decommissioned";

export interface Asset {
  id: string;
  code: string;
  name: string;
  description: string;
  companyId: string;
  categoryId: string;
  category?: AssetCategory;
  locationId: string;
  location?: Location;
  status: AssetStatus;
  lastMaintenanceAt: string;
  installationDate: string;
  expirationDate: string;
  manufacturer: string;
  model: string;
  specifications: string[];
  photo: string;
  createdAt: string;
  updatedAt: string;
}
