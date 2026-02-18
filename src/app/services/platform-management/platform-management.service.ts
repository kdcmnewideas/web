import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPlatformUser } from '../../core/interface/platform-users.interface';

@Injectable({
  providedIn: 'root',
})
export class PlatformManagementService {
  baseUrl = environment.userServiceAPI + '/admin/users';

  private http = inject(HttpClient);

  getUsers = (role?: string, status?: string, skip: number = 0, limit: number = 100) => {
    const params: any = { skip, limit };
    if (role) {
      params['role'] = role;
    }
    if (status) {
      params['status'] = status;
    }
    return this.http.get<IPlatformUser[]>(`${this.baseUrl}/`, {
      params,
    });
  };

  assignPlatformRole = (userId: string, role: string) => {
    return this.http.post<IPlatformUser>(`${this.baseUrl}/${userId}/role`, { platform_role: role });
  };

  disableUser = (userId: string) => {
    return this.http.post<IPlatformUser>(`${this.baseUrl}/${userId}/disable`, {});
  };
}
