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
    path: 'ai-usage',
    loadComponent: () => import('./ai-usage/ai-usage').then((m) => m.AiUsage),
    title: 'AI Usage',
  },
  {
    path: 'analytics',
    loadComponent: () => import('./analytics/analytics').then((m) => m.Analytics),
    title: 'Analytics',
  },
  {
    path: 'profile',
    loadComponent: () => import('./user/user').then((m) => m.User),
    title: 'Profile',
  },
  {
    path: 'subject/:id',
    loadComponent: () => import('./subject/subject').then((m) => m.Subject),
    title: 'Subject',
  },
  {
    path: 'revision',
    loadComponent: () => import('./revision/revision').then((m) => m.Revision),
    title: 'Revision',
  },
  {
    path: 'learn/:id',
    loadComponent: () => import('./learn/learn').then((m) => m.Learn),
    title: 'Learn',
  },
  {
    path: 'revise/:id',
    loadComponent: () => import('./revise/revise').then((m) => m.Revise),
    title: 'Revise',
  },
  {
    path: 'test/:id',
    loadComponent: () => import('./test/test').then((m) => m.Test),
    title: 'Test',
  },
  {
    path: 'goals',
    loadComponent: () => import('./goals/goals').then((m) => m.Goals),
    title: 'Goals',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
