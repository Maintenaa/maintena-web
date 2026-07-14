export interface Company {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId: string;
  employeesCount: number;
  createdAt?: string | null;
  updatedAt?: string | null;
}
