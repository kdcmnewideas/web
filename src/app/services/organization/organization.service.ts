import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  IAcceptInvite,
  IAddMenber,
  IBulkUpdateResponse,
  ICreateOrg,
  IMember,
  IOrganization,
  IRotateKey,
  IUpdateOrg,
} from '../../core/interface/organization.interface';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  baseUrl = environment.userServiceAPI + '/orgs';

  private http = inject(HttpClient);

  getOrganizations = () => this.http.get<IOrganization[]>(`${this.baseUrl}/`);

  getOrganization = (orgId: string) => this.http.get<IOrganization>(`${this.baseUrl}/${orgId}`);

  getOrganizationMembers = (orgId: string) =>
    this.http.get<IMember[]>(`${this.baseUrl}/${orgId}/members`);

  createOrg = (data: ICreateOrg) => this.http.post<IOrganization>(`${this.baseUrl}/`, data);

  updateOrganization = (orgId: string, data: IUpdateOrg) =>
    this.http.patch<IOrganization>(`${this.baseUrl}/${orgId}`, data);

  addMember = (orgId: string, data: IAddMenber) =>
    this.http.post<string>(`${this.baseUrl}/${orgId}/members`, data);

  addBulkMembers = (orgId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<IBulkUpdateResponse>(`${this.baseUrl}/${orgId}/members/bulk`, formData, {
      headers,
    });
  };

  joinOrgByKey = (key: string) => this.http.post<string>(`${this.baseUrl}/join`, { join_key: key });

  updateMember = (orgId: string, memberId: string, data: IUpdateOrg) =>
    this.http.patch<IMember>(`${this.baseUrl}/${orgId}/members/${memberId}`, data);

  bulkApproveMembers = (orgId: string, memberIds: string[]) =>
    this.http.post<string>(`${this.baseUrl}/${orgId}/members/approve`, { user_ids: memberIds });

  bulkRejectMembers = (orgId: string, memberIds: string[]) =>
    this.http.post<string>(`${this.baseUrl}/${orgId}/members/reject`, { user_ids: memberIds });

  rotateJoinKey = (orgId: string) =>
    this.http.post<IRotateKey>(`${this.baseUrl}/${orgId}/rotate-join-key`, {});

  acceptInvite = (orgId: string, data: IAcceptInvite) =>
    this.http.post<string>(`${this.baseUrl}/${orgId}/accept`, data);

  resendInvite = (orgId: string, inviteId: string) =>
    this.http.post<string>(`${this.baseUrl}/${orgId}/invites/${inviteId}/resend`, {});

  cancelInvite = (orgId: string, inviteId: string) =>
    this.http.delete<string>(`${this.baseUrl}/${orgId}/invites/${inviteId}`);
}
