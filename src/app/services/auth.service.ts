import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginModel, LoginResponse } from '../shared/DTOs/LoginModel';
import { environment } from '../../environments/environment';
import { RegisterModel } from '../shared/DTOs/RegisterModel';
import { ResponseModel } from '../shared/DTOs/ResponseModel';
import { UserRole } from '../shared/DTOs/UserRole';
import { RefreshTokenDto } from '../shared/DTOs/TokenRefreshDTO';
import { TokenResultDto } from '../shared/DTOs/TokenResultDTO';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AUTH_KEY = {
    accessToken: 'auth.jwt:' + location.origin,
    refreshToken: 'auth.rt:' + location.origin,
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<LoginResponse | null>;
    public currentUser: Observable<LoginResponse | null>;
    private jwtHelper: JwtHelperService;

    constructor(private http: HttpClient) {
        this.jwtHelper = new JwtHelperService();
        this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(
            this.getUserFromStorage()
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    private getUserFromStorage(): LoginResponse | null {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    }

    public get currentUserValue(): LoginResponse | null {
        return this.currentUserSubject.value;
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
        console.log('AccessToken:', response.accessToken); // ตรวจสอบการส่งโทเค็น
        console.log('RefreshToken:', response.refreshToken);
        localStorage.setItem(AUTH_KEY.accessToken, response.accessToken);
        localStorage.setItem(AUTH_KEY.refreshToken, response.refreshToken);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
    }

    logout(): void {
        localStorage.removeItem(AUTH_KEY.accessToken);
        localStorage.removeItem(AUTH_KEY.refreshToken);
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    refreshToken(): Observable<TokenResultDto> {
        const refreshTokenDto: RefreshTokenDto = {
            accessToken: localStorage.getItem(AUTH_KEY.accessToken) || '',
            refreshToken: localStorage.getItem(AUTH_KEY.refreshToken) || '',
        };

        return this.http
            .post<TokenResultDto>(
                environment.apiBaseUrl + '/authentication/refresh-token',
                refreshTokenDto
            )
            .pipe(
                tap((result) => {
                    if (result.accessToken) {
                        localStorage.setItem(
                            AUTH_KEY.accessToken,
                            result.accessToken
                        );
                    }
                    if (result.refreshToken) {
                        localStorage.setItem(
                            AUTH_KEY.refreshToken,
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
        return token ? !this.jwtHelper.isTokenExpired(token) : false;
    }

    hasRole(role: UserRole): boolean {
        const token = this.getToken();
        if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            return (
                decodedToken &&
                decodedToken.roles &&
                decodedToken.roles.includes(role.toString())
            );
        }
        return false;
    }

    getTokenExpirationDate(): Date | null {
        const token = this.getToken();
        return token ? this.jwtHelper.getTokenExpirationDate(token) : null;
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
        return localStorage.getItem(AUTH_KEY.accessToken);
    }

    setToken(token: string): void {
        localStorage.setItem(AUTH_KEY.accessToken, token);
    }
}
