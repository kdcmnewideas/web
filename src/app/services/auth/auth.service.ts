import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister } from '../../core/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.userServiceAPI + '/auth';

  constructor(private http: HttpClient) {}

  login = (data: ILogin) => this.http.post(`${this.baseUrl}/login`, data);

  register = (data: IRegister) => this.http.post(`${this.baseUrl}/register`, data);
}
