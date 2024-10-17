import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export function authInterceptorFn(tokenGetter: () => string | null): HttpInterceptorFn {
    return (req, next) => {
        const token = tokenGetter();
        
        if (token && !req.url.includes('/authentication/')) {
            const cloned = addToken(req, token);
            return next(cloned);
        }
        return next(req);
    };
}

function addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
}
