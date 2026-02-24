import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
    title: 'Register',
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./forget-password/forget-password').then((m) => m.ForgetPassword),
    title: 'Forget Password',
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password').then((m) => m.ResetPassword),
    title: 'Reset Password',
  },
  {
    path: 'verify-account',
    loadComponent: () => import('./verify-account/verify-account').then((m) => m.VerifyAccount),
    title: 'Verify Account',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
