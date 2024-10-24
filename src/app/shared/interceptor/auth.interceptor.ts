import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { TokenResultDto } from '../DTOs/TokenResultDTO';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const token = this.authService.getToken();
        if (token) {
            request = this.addToken(request, token);
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !request.url.includes('authentication/refresh-token')) {
                    return this.handle401Error(request, next);
                }
                return throwError(() => error);
            })
        );
    }

    private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
        return request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });
    }

    private handle401Error(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return this.authService.refreshToken().pipe(
            switchMap((tokenResult: TokenResultDto) => {
                if (tokenResult.accessToken) {
                    this.authService.setToken(tokenResult.accessToken);
                    return next.handle(this.addToken(request, tokenResult.accessToken));
                } else {
                    throw new Error('Access token is undefined');
                }
            }),
            catchError((error) => {
                this.authService.logout();
                return throwError(() => error);
            })
        );
    }
}
