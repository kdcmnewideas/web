import { Routes } from '@angular/router';

export const ORG_ADMIN_ROUTES: Routes = [
  {
    path: 'users',
    title: 'Users',
    loadComponent: () => import('./users/users').then((m) => m.Users),
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
    path: 'profile',
    title: 'Profile',
    loadComponent: () => import('../user-profile/user-profile').then((m) => m.UserProfile),
  },
  {
    path: '**',
    redirectTo: 'users',
  },
];
