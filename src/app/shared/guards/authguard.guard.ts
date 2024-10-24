import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const res = await authService.isUserAuthenticated();

    if (!res) {
        router.navigate(['/authentication/sign-in'], {
            queryParams: { returnUrl: state.url },
        });
    }

    return res;
};
