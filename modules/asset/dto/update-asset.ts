import { AssetStatus } from "./asset";

export interface UpdateAssetRequest {
  companyId: string;
  assetId: string;
  code: string;
  name: string;
  description: string;
  categoryId: string;
  locationId: string;
  status: AssetStatus;
  lastMaintenanceAt?: string;
  installationDate?: string;
  expirationDate?: string;
  manufacturer: string;
  model: string;
  specifications?: string[];
  photo: string;
}
