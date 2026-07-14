import { Position } from "@/modules/position/dto/position";
import { User } from "@/modules/user/dto/user";

export interface Employee {
  id: string;
  userId: string;
  companyId: string;
  positionId: string;
  user: User;
  position: Position;
}
