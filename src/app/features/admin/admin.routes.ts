import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'users',
    title: 'Users',
    loadComponent: () => import('./users/users').then((m) => m.Users),
  },
  {
    path: 'boards',
    title: 'Boards',
    loadComponent: () => import('./boards/boards').then((m) => m.Boards),
  },
  {
    path: 'classes',
    title: 'Classes',
    loadComponent: () => import('./classes/classes').then((m) => m.Classes),
  },
  {
    path: 'sections',
    title: 'Sections',
    loadComponent: () => import('./sections/sections').then((m) => m.Sections),
  },
  {
    path: 'courses',
    title: 'Courses',
    loadComponent: () => import('./courses/courses').then((m) => m.Courses),
  },
  {
    path: '**',
    redirectTo: 'users',
  },
];
