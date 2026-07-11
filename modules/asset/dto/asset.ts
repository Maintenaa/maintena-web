export type AssetStatus =
  | "operational"
  | "inMaintenance"
  | "underRepair"
  | "outOfService"
  | "decommissioned";

export type AssetPriority = "low" | "medium" | "high" | "critical";

export interface Asset {
  id: string;
  code: string;
  name: string;
  description: string;
  companyId: string;
  categoryId: string;
  locationId: string;
  status: AssetStatus;
  priority: AssetPriority;
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
