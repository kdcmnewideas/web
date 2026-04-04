import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const expireTime = localStorage.getItem('expires_in');
  const authService = inject(AuthService);
  const skipAuth = req.headers.get('skip-auth');

  // if caller opts out of auth, pass through immediately
  if (skipAuth) {
    return next(req);
  }

  // helper that clones request with provided token and forwards it
  const forwardWith = (tok: string | null) => {
    if (tok) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${tok}` },
      });
    }
    return next(req);
  };

  // if we know when the token expires, examine it
  if (expireTime) {
    const expireDate = new Date(expireTime);
    if (expireDate < new Date()) {
      // token has expired; attempt refresh before making the request
      if (!refreshToken) {
        // no refresh token available: redirect to login and proceed without auth
        router.navigate(['/login']);
        return forwardWith(null);
      }

      // perform refresh and then continue with the new token
      return authService.refreshToken(refreshToken).pipe(
        switchMap((res) => {
          // update storage
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          localStorage.setItem('expires_in', getExpireTime(res.expires_in).toString());
          // forward request with fresh token
          return forwardWith(res.access_token);
        }),
        catchError((err) => {
          // failed to refresh: clear storage and send user to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('expires_in');
          router.navigate(['/login']);
          return throwError(() => err);
        }),
      );
    }
    // token not yet expired; we can continue below using existing token
  }

  const getExpireTime = (expires_in: number) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + expires_in - 5);
    return date;
  };

  // normal path: attach token if present
  return forwardWith(token).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
