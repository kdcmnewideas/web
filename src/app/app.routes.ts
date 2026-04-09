import { Routes } from '@angular/router';
import { roleBasedRedirectGuard } from './core/guards/role-based-redirect.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'platform-admin',
    loadChildren: () =>
      import('./features/platform-admin/platform-admin.routes').then((m) => m.ADMIN_ROUTES),
    loadComponent: () =>
      import('./features/platform-admin/platform-admin').then((m) => m.PlatformAdmin),
    title: 'Admin',
  },
  {
    path: 'org-admin',
    loadComponent: () => import('./features/org-admin/org-admin').then((m) => m.OrgAdmin),
    loadChildren: () =>
      import('./features/org-admin/org-admin.routes').then((m) => m.ORG_ADMIN_ROUTES),
    title: 'Organization Admin',
  },
  {
    path: '',
    canActivate: [roleBasedRedirectGuard],
    loadChildren: () => import('./features/student/student.routes').then((m) => m.STUDENT_ROUTES),
    loadComponent: () => import('./features/student/student').then((m) => m.Student),
    title: 'Aile Learning',
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/user-profile/user-profile').then((m) => m.UserProfile),
    title: 'Profile',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
