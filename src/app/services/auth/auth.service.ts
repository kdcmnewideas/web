import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister } from '../../core/interface/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.userServiceAPI + '/auth';

  constructor(private http: HttpClient) {}

  login = (data: ILogin) => this.http.post(`${this.baseUrl}/login`, data);

  register = (data: IRegister) => this.http.post(`${this.baseUrl}/register`, data);

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
