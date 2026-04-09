import { Routes } from '@angular/router';

export const ORG_ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
    title: 'Dashboard',
  },
  {
    path: 'subjects',
    loadComponent: () => import('./subject/subject').then((m) => m.Subject),
    title: 'Subjects',
  },
  {
    path: 'courses',
    loadComponent: () => import('./courses/courses').then((m) => m.Courses),
    title: 'Courses',
  },
  {
    path: 'view-content',
    loadComponent: () => import('./view-content/view-content').then((m) => m.ViewContent),
    title: 'View Content',
  },
  {
    path: 'users',
    loadComponent: () => import('./members/members').then((m) => m.Members),
    title: 'Members',
  },
];
