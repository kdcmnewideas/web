import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
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
