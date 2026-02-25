import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    loadComponent: () => import('./features/admin/admin').then((m) => m.Admin),
    title: 'Admin',
  },
  {
    path: 'org-admin',
    loadChildren: () =>
      import('./features/org-admin/org-admin.routes').then((m) => m.ORG_ADMIN_ROUTES),
    loadComponent: () => import('./features/org-admin/org-admin').then((m) => m.OrgAdmin),
    title: 'Organization Admin',
  },
  {
    path: '',
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
