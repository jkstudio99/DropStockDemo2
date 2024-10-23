import {
    HttpErrorResponse,
    HttpInterceptorFn,
    HttpEvent,
    HttpRequest,
    HttpHandlerFn,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { getErrorMessage } from '../utils/error-utils';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const translateService = inject(TranslateService);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            let message = '';

            if (err.status === 400) {
                if (
                    router.url.startsWith('/authentication/sign-up') ||
                    router.url.startsWith('/authentication/reset-password')
                ) {
                    message = getErrorMessage(err, translateService);
                } else {
                    message = err.error ? err.error : err.message;
                }
            } else if (err.status === 401) {
                if (authService.getToken()) {
                    return authService.refreshToken().pipe(
                        switchMap(() => next(req)), // Retry the original request
                        catchError(() => {
                            router.navigate(['/authentication/sign-in']);
                            return throwError(
                                () =>
                                    new Error(
                                        translateService.instant(
                                            'ERRORS.SESSION_EXPIRED'
                                        )
                                    )
                            );
                        })
                    );
                } else {
                    message = err.error ? err.error : err.message;
                    router.navigate(['/authentication/sign-in'], {
                        queryParams: { returnUrl: router.url },
                    });
                }
            } else {
                message = translateService.instant('ERRORS.UNEXPECTED');
            }

            return throwError(() => new Error(message));
        })
    );
};
