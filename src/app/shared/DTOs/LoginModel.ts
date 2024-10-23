export interface LoginModel {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    userData: {
        id: string;
        username: string;
        email: string;
        roles: string[];
    };
}
