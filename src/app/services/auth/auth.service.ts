import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginSuccessful, IRegister, IRegisterSuccessful } from '../../core/interface/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.userServiceAPI + '/auth';

  private http = inject(HttpClient);

  login = (data: ILogin) => this.http.post<ILoginSuccessful>(`${this.baseUrl}/login`, data);

  register = (data: IRegister) => this.http.post<IRegisterSuccessful>(`${this.baseUrl}/register`, data);

  verify = (token: string) => this.http.post<string>(`${this.baseUrl}/verify`, { token });

  forgotPassword = (email: string) => this.http.post<string>(`${this.baseUrl}/forgot-password`, { email });

  resetPassword = (token: string, password: string) =>
    this.http.post<string>(`${this.baseUrl}/reset-password`, { token, new_password: password });

  /**
   * Clear authentication tokens from storage. This removes common token keys
   * used across the app: `access_token`, `token`, `auth_token`, `refresh_token`.
   */
  signOut(): void {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('token');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    } catch (e) {
      // ignore storage errors but log for debugging
      console.warn('AuthService.signOut: failed to clear tokens', e);
    }
  }
}
