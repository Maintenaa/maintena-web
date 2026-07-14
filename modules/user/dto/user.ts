export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerifiedAt?: string | null;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  bannedUntil?: string;
}
