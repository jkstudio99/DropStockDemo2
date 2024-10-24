import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../DTOs/UserRole';

export const managerGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const res = authService.hasRole(UserRole.Manager);

    if (!res) {
        router.navigate(['/forbidden'], {
            queryParams: { returnUrl: state.url },
        });
    }

    return res;
};
