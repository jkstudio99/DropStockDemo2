import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthenticationComponent } from '../../authentication/authentication.component';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    if (state.url === '/authentication/sign-in' || state.url === '/authentication/sign-up') {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  } else {
    if (state.url !== '/authentication/sign-in' && state.url !== '/authentication/sign-up') {
      router.navigate(['/authentication/sign-in'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }
};

