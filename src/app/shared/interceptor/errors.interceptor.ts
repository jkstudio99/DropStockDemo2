import {
    HttpErrorResponse,
    HttpInterceptorFn,
    HttpEvent,
    HttpRequest,
    HttpHandlerFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, EMPTY, switchMap, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const translateService = inject(TranslateService);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            let message = '';

            switch (err.status) {
                case 400:
                    message = handleBadRequestError(
                        err,
                        router,
                        translateService
                    );
                    break;
                case 401:
                    // Check if the error is due to an expired token
                    if (authService.getRefreshToken()) {
                        return handleExpiredToken(req, next, authService);
                    }
                    // If no refresh token, redirect to login
                    router.navigate(['/authentication/sign-in']);
                    message = handleUnauthorizedError(
                        err,
                        router,
                        translateService
                    );
                    break;
                case 403:
                    message = translateService.instant('ERRORS.FORBIDDEN');
                    break;
                case 404:
                    message = translateService.instant('ERRORS.NOT_FOUND');
                    break;
                case 500:
                    message = translateService.instant('ERRORS.SERVER_ERROR');
                    break;
                default:
                    message = translateService.instant('ERRORS.UNEXPECTED');
            }

            return throwError(() => new Error(message));
        })
    );
};

function handleExpiredToken(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
    authService: AuthService
): Observable<HttpEvent<unknown>> {
    return authService.refreshToken().pipe(
        switchMap((newToken: string) => {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${newToken}`,
                },
            });
            return next(clonedReq);
        }),
        catchError((refreshError) => {
            // If refresh token fails, redirect to login
            inject(Router).navigate(['/authentication/sign-in']);
            return EMPTY;
        })
    );
}

function handleBadRequestError(
    err: HttpErrorResponse,
    router: Router,
    translateService: TranslateService
): string {
    if (
        router.url.startsWith('/authentication/sign-up') ||
        router.url.startsWith('/authentication/reset-password')
    ) {
        return getErrorMessage(err, translateService);
    }
    return err.error?.message || translateService.instant('ERRORS.BAD_REQUEST');
}

function handleUnauthorizedError(
    err: HttpErrorResponse,
    router: Router,
    translateService: TranslateService
): string {
    if (router.url.startsWith('/authentication/sign-in')) {
        return getErrorMessage(err, translateService);
    }
    const message =
        err.error?.message || translateService.instant('ERRORS.UNAUTHORIZED');
    router.navigate(['/authentication/sign-in'], {
        queryParams: { returnUrl: router.url },
    });
    return message;
}

function getErrorMessage(
    err: HttpErrorResponse,
    translateService: TranslateService
): string {
    if (err.error && typeof err.error === 'object' && 'errors' in err.error) {
        const errors = Object.values(err.error.errors);
        return errors
            .filter((e): e is string => typeof e === 'string')
            .join(', ');
    }
    return translateService.instant('ERRORS.VALIDATION_ERROR');
}
