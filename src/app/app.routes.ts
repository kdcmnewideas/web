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
    title: 'Admin'
  },
  {
    path: '',
    loadChildren: () => import('./features/student/student.routes').then((m) => m.STUDENT_ROUTES),
    loadComponent: () => import('./features/student/student').then((m) => m.Student),
    title: 'Aile Learning'
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
