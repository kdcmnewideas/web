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
    path: 'org',
    title: 'Organization',
    loadComponent: () => import('./organization/organization').then((m) => m.Organization),
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
