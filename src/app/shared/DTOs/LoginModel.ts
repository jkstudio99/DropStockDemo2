export interface LoginModel {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    expiration: string;
    userData: {
        userName: string;
        email: string;
        roles: string[];
    };
}
