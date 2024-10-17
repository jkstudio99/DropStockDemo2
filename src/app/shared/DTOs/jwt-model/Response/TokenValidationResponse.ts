import { UserRole } from "../../UserRole";

export interface TokenValidationResponse {
  status: string;
  userName: string;
  roles: UserRole[];
}
