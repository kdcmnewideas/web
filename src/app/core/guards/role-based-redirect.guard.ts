import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { PlatformRole, OrganizationRole } from '../../shared/constants/roles.constant';

/**
 * Guard that redirects users to their respective dashboard based on their platform role
 *
 * Platform Role Redirects:
 * - SUPER_ADMIN, ADMIN, SUB_ADMIN → /platform-admin
 * - USER, STUDENT, ORG_FACULTY, ORG_ADMIN → /org-admin or / based on organization context
 */
export const roleBasedRedirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.getUserDetails().subscribe({
    next: (user) => {
      redirectByRole(user.platform_role, router);
    },
    error: () => {
      // If unable to get user details, redirect to login
      router.navigate(['/auth/login']);
    },
  });
  return true;
};

/**
 * Redirects user based on platform role
 * @param role - The user's platform role
 * @param router - Angular Router instance
 */
function redirectByRole(role: string, router: Router) {
  switch (role) {
    // Platform admin roles redirect to platform admin dashboard
    case PlatformRole.SUPER_ADMIN:
    case PlatformRole.ADMIN:
    case PlatformRole.SUB_ADMIN:
      router.navigate(['/platform-admin']);
      break;

    // Organization roles and default user redirect to org-admin or home
    case PlatformRole.USER:
    case OrganizationRole.ORG_ADMIN:
    case OrganizationRole.ORG_FACULTY:
    case OrganizationRole.STUDENT:
      router.navigate(['/org-admin']);
      break;

    // Default fallback
    default:
      router.navigate(['/']);
  }
}
