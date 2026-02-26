import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  let expireTime = localStorage.getItem('expires_in');
  const authService = inject(AuthService);
  const skipAuth = req.headers.get('skip-auth');

  if (skipAuth) {
    return next(req);
  }
  if (expireTime) {
    const expireDate = new Date(expireTime);
    if (expireDate < new Date()) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_in');
      router.navigate(['/login']);
    } else {
      authService.refreshToken(refreshToken || '').subscribe((res) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('expires_in', res.expires_in.toString());
        token = res.access_token;
      });
    }
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
