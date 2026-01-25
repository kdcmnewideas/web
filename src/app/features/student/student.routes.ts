import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./student-home/student-home').then((m) => m.StudentHome),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
