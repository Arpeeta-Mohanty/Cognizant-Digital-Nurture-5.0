import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Functional guard (Angular 15+) — protects routes from unauthenticated access
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to home with a returnUrl query param
  router.navigate(['/'], { queryParams: { returnUrl: state.url } });
  return false;
};
