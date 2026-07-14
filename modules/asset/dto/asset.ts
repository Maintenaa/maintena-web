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
  locationId: string;
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
