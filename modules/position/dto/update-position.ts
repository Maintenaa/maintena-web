export interface UpdatePositionRequest {
  companyId: string;
  positionId: string;
  name: string;
  isAdmin: boolean;
  isTechnician: boolean;
  isOwner: boolean;
}
