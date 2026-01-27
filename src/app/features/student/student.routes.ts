import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./student-home/student-home').then((m) => m.StudentHome),
    title: 'Aile Learning',
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./leaderboard/leaderboard').then((m) => m.Leaderboard),
    title: 'Leaderboard',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
