import { inject, Injectable } from '@angular/core';
import {
    CanActivateFn,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../DTOs/UserRole';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate: CanActivateFn = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree => {
        const requiredRoles = route.data['roles'] as UserRole[];

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const hasRequiredRole = requiredRoles.some((role) =>
            this.authService.hasRole(role)
        );

        if (!hasRequiredRole) {
            // Redirect to an unauthorized page or home page
            return this.router.createUrlTree(['/unauthorized']);
        }

        return true;
    };
}
export const roleGuard: CanActivateFn = (route, state) => {
    const roleGuardInstance = new RoleGuard(
        inject(AuthService),
        inject(Router)
    );
    return roleGuardInstance.canActivate(route, state);
};
