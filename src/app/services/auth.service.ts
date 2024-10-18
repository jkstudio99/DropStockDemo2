import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginModel, LoginResponse } from '../shared/DTOs/LoginModel';
import { environment } from '../../environments/environment';
import { RegisterModel } from '../shared/DTOs/RegisterModel';
import { ResponseModel } from '../shared/DTOs/ResponseModel';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<LoginResponse | null>;
    public currentUser: Observable<LoginResponse | null>;
    private tokenSubject: BehaviorSubject<string | null>;
    public token$: Observable<string | null>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(
            JSON.parse(localStorage.getItem('currentUser') || 'null')
        );
        this.currentUser = this.currentUserSubject.asObservable();
        this.tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
        this.token$ = this.tokenSubject.asObservable();
    }

    public get currentUserValue(): LoginResponse | null {
        return this.currentUserSubject.value;
    }

    private getStoredToken(): string | null {
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        return user?.token || null;
    }

    login(loginModel: LoginModel): Observable<LoginResponse> {
        const url = `${environment.apiBaseUrl}/authentication/login`;
        console.log('Login URL:', url);
        return this.http.post<LoginResponse>(url, loginModel).pipe(
            map((response) => {
                localStorage.setItem('currentUser', JSON.stringify(response));
                this.currentUserSubject.next(response);
                return response;
            })
        );
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    refreshToken(): Observable<string> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            return throwError(() => new Error('No refresh token available'));
        }
        return this.http
            .post<LoginResponse>(
                `${environment.apiBaseUrl}/authentication/refresh-token`,
                { refreshToken }
            )
            .pipe(
                map((response) => {
                    if (response && response.token) {
                        this.setToken(response.token);
                        return response.token;
                    } else {
                        throw new Error('Invalid token response');
                    }
                })
            );
    }

    isLoggedIn(): boolean {
        return !!this.currentUserValue;
    }

    getToken(): string | null {
        return this.tokenSubject.value;
    }

    getRefreshToken(): string | null {
        return this.currentUserValue?.refreshToken || null;
    }

    setToken(token: string): void {
        const currentUser = this.currentUserValue;
        if (currentUser) {
            const updatedUser = { ...currentUser, token };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
            this.tokenSubject.next(token);
        }
    }

    setRefreshToken(refreshToken: string) {
        if (this.currentUserValue) {
            const updatedUser = { ...this.currentUserValue, refreshToken };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
        }
    }

    isAuthenticated(): boolean {
        return !!this.currentUserValue;
    }

    register(registerModel: RegisterModel): Observable<ResponseModel> {
        return this.http
            .post<ResponseModel>(
                `${environment.apiBaseUrl}/authentication/register-user`,
                registerModel
            )
            .pipe(
                map((response) => {
                    // You might want to automatically log in the user after registration
                    // or simply return the response
                    return response;
                })
            );
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post<any>(
            `${environment.apiBaseUrl}/api/Authentication/forgot-password`,
            { email }
        );
    }
}
