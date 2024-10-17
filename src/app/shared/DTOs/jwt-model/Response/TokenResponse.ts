import { UserRole } from '../../UserRole';

export interface TokenResponse {
    token: string;
    refreshToken: string;
    expiration: string;
    userData: {
      userName: string;
      email: string;
      roles: UserRole[];
    };
};
