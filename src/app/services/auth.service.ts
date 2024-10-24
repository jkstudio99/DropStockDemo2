import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginModel, LoginResponse } from '../shared/DTOs/LoginModel';
import { environment } from '../../environments/environment';
import { RegisterModel } from '../shared/DTOs/RegisterModel';
import { ResponseModel } from '../shared/DTOs/ResponseModel';
import { UserRole } from '../shared/DTOs/UserRole';
import { RefreshTokenDto } from '../shared/DTOs/TokenRefreshDTO';
import { TokenResultDto } from '../shared/DTOs/TokenResultDTO';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    private getUserFromStorage(): LoginResponse | null {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    }

    login(loginModel: LoginModel): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(
                environment.apiBaseUrl + '/authentication/login',
                loginModel
            )
            .pipe(
                tap((response) => this.setUserData(response)),
                catchError(this.handleError)
            );
    }

    private setUserData(response: LoginResponse): void {
        console.log('AccessToken:', response.accessToken);
        console.log('RefreshToken:', response.refreshToken);
        this.setToken(response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('currentUser', JSON.stringify(response));
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser');
    }

    refreshToken(): Observable<TokenResultDto> {
        const refreshTokenDto: RefreshTokenDto = {
            accessToken: this.getToken() || '',
            refreshToken: localStorage.getItem('refreshToken') || '',
        };

        return this.http
            .post<TokenResultDto>(
                environment.apiBaseUrl + '/authentication/refresh-token',
                refreshTokenDto
            )
            .pipe(
                tap((result) => {
                    if (result.accessToken) {
                        this.setToken(result.accessToken);
                    }
                    if (result.refreshToken) {
                        localStorage.setItem(
                            'refreshToken',
                            result.refreshToken
                        );
                    }
                }),
                catchError(this.handleError)
            );
    }

    register(registerModel: RegisterModel): Observable<ResponseModel> {
        let endpoint = environment.apiBaseUrl + '/authentication/register-user';

        switch (registerModel.role) {
            case UserRole.Manager:
                endpoint =
                    environment.apiBaseUrl + '/authentication/register-manager';
                break;
            case UserRole.Admin:
                endpoint =
                    environment.apiBaseUrl + '/authentication/register-admin';
                break;
        }

        return this.http
            .post<ResponseModel>(endpoint, registerModel)
            .pipe(catchError(this.handleError));
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return token ? !this.isTokenExpired(token) : false;
    }

    hasRole(role: UserRole): boolean {
        const token = this.getToken();
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                return (
                    decodedToken &&
                    decodedToken.roles &&
                    decodedToken.roles.includes(role.toString())
                );
            } catch (error) {
                console.error('Error decoding token:', error);
                return false;
            }
        }
        return false;
    }

    isTokenExpired(token: string): boolean {
        if (!token) {
            return true;
        }

        try {
            const decoded: any = jwtDecode(token);
            if (!decoded.exp) {
                return true; // ไม่มี exp ถือว่าหมดอายุ
            }
            const expiryDate = new Date(0);
            expiryDate.setUTCSeconds(decoded.exp);

            return !(expiryDate.valueOf() > new Date().valueOf());
        } catch (error) {
            console.error('Error decoding token:', error);
            return true; // หาก decode ไม่ได้ ให้ถือว่าหมดอายุ
        }
    }

    forgotPassword(email: string): Observable<unknown> {
        return this.http
            .post<unknown>(
                environment.apiBaseUrl + '/authentication/forgot-password',
                { email }
            )
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        return throwError(
            () => new Error('An error occurred. Please try again.')
        );
    }

    getToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    setToken(token: string): void {
        if (token) {
            localStorage.setItem('accessToken', token); // เก็บ access token
        } else {
            console.error('Attempt to set undefined token');
        }
    }
}
