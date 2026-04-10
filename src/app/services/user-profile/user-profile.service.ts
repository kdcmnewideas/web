import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUserProfileUpdate } from '../../core/interface/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  baseUrl = environment.userServiceAPI + '/auth';
  http = inject(HttpClient);

  updateProfile(data: IUserProfileUpdate): Observable<IUser> {
    return this.http.patch<IUser>(`${this.baseUrl}/me`, data);
  }
}
