import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, firstValueFrom, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginModel, LoginResponse } from '../shared/DTOs/LoginModel';
import { environment } from '../../environments/environment';
import { RegisterModel } from '../shared/DTOs/RegisterModel';
import { ResponseModel } from '../shared/DTOs/ResponseModel';
import { UserRole } from '../shared/DTOs/UserRole';
import { RefreshTokenDto } from '../shared/DTOs/TokenRefreshDTO';
import { TokenResultDto } from '../shared/DTOs/TokenResultDTO';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ForgotPasswordModel } from '../shared/DTOs/ForgotPasswordModel';
import { ResetPasswordModel } from '../shared/DTOs/ResetPasswordModel';

export const authKey = {
    accessToken: 'auth.jwt:' + location.origin,
    refreshToken: 'auth.rt:' + location.origin,
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authChangeSub = new Subject<boolean>();
    authChanged = this.authChangeSub.asObservable();
    jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient) {}

    register(request: RegisterModel): Observable<unknown> {
        const reqUrl = environment.apiBaseUrl + '/authentication/register';
        return this.http
            .post<unknown>(reqUrl, request)
            .pipe(catchError(this.handleError));
    }

    login(request: LoginModel): Observable<TokenResultDto> {
        const reqUrl = environment.apiBaseUrl + '/authentication/login';
        return this.http.post<TokenResultDto>(reqUrl, request).pipe(
            tap((response) => {
                if (response && response.accessToken) {
                    if (response.refreshToken) {
                        this.setToken(
                            response.accessToken,
                            response.refreshToken
                        );
                    }
                }
            }),
            catchError(this.handleError)
        );
    }

    logout(): void {
        const reqUrl = environment.apiBaseUrl + '/authentication/logout';
        this.http.post<unknown>(reqUrl, {}).subscribe(() => {
            this.clearLocalStorage();
        });
    }

    refreshToken(): Observable<TokenResultDto> {
        const reqUrl = environment.apiBaseUrl + '/authentication/refresh-token';
        const req: RefreshTokenDto = {
            accessToken: localStorage.getItem(authKey.accessToken) || '',
            refreshToken: localStorage.getItem(authKey.refreshToken) || '',
        };

        return this.http.post<TokenResultDto>(reqUrl, req).pipe(
            tap((result) => {
                if (result.accessToken && result.refreshToken) {
                    this.setToken(result.accessToken, result.refreshToken);
                }
            }),
            catchError(this.handleError)
        );
    }

    async isUserAuthenticated(): Promise<boolean> {
        const accessToken = localStorage.getItem(authKey.accessToken);
        if (!accessToken || this.jwtHelper.isTokenExpired(accessToken)) {
            try {
                const res = await firstValueFrom(this.refreshToken());
                this.setToken(res.accessToken!, res.refreshToken!);
                return true;
            } catch (error) {
                this.clearLocalStorage();
                return false;
            }
        }
        return true;
    }

    forgotPassword(request: ForgotPasswordModel): Observable<unknown> {
        const reqUrl =
            environment.apiBaseUrl + '/authentication/forgot-password';
        return this.http
            .post<unknown>(reqUrl, request)
            .pipe(catchError(this.handleError));
    }

    resetPassword(request: ResetPasswordModel): Observable<unknown> {
        const reqUrl =
            environment.apiBaseUrl + '/authentication/reset-password';
        return this.http
            .post<unknown>(reqUrl, request)
            .pipe(catchError(this.handleError));
    }

    getToken(): string | null {
        return localStorage.getItem(authKey.accessToken);
    }
    isUserInRole(role: string): boolean {
        const token = this.getToken();
        if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            const userRoles = decodedToken['roles'];
            if (userRoles && Array.isArray(userRoles)) {
                return userRoles.includes(role);
            }
            return userRoles === role;
        }
        return false;
    }

    getUserRole(): string | null {
        const token = this.getToken();
        if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken['role'] || null;
        }
        return null;
    }

    private setToken(accessToken: string, refreshToken: string): void {
        localStorage.setItem(authKey.accessToken, accessToken);
        localStorage.setItem(authKey.refreshToken, refreshToken);
    }

    private clearLocalStorage(): void {
        localStorage.removeItem(authKey.accessToken);
        localStorage.removeItem(authKey.refreshToken);
        localStorage.removeItem('currentUser');
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        return throwError(
            () => new Error('An error occurred. Please try again.')
        );
    }
}
