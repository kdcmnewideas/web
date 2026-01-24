import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../../core/interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.userServiceAPI;

  constructor(private http: HttpClient) {}

  login = (data: ILogin) => this.http.post(`${this.baseUrl}/login`, data);
}
