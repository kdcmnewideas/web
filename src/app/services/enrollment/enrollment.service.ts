import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IEnrollData } from '../../core/interface/enrollment.interface';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  baseUrl = environment.circulumAPI + '/enrollments';
  http = inject(HttpClient);

  getHeaders = (user: any) => {
    let httpHeaders = new HttpHeaders();

    if (user.org_role && user.org_id) {
      httpHeaders = httpHeaders.set('X-Org-ID', user.org_id);
      httpHeaders = httpHeaders.set('X-Org-Role', user.org_role);
    }
    return httpHeaders;
  };

  joinByCode = (code: string, userDetails: any) => {
    const headers = this.getHeaders(userDetails);
    return this.http.post<string>(this.baseUrl, { code }, { headers });
  };

  approveRequest = (enrollmentId: string, userDetails: any, action: 'approve' | 'reject') => {
    const headers = this.getHeaders(userDetails);
    return this.http.post<string>(
      `${this.baseUrl}/${enrollmentId}/approve`,
      {},
      { headers, params: { action } },
    );
  };

  manualEnroll = (
    classId: string,
    sectionId: string,
    enrollData: IEnrollData,
    userDetails: any,
  ) => {
    const headers = this.getHeaders(userDetails);
    return this.http.post<string>(`${this.baseUrl}/classes/${classId}/enroll`, enrollData, {
      headers,
      params: { section_id: sectionId },
    });
  };

  bulkEnroll = (classId: string, file: File) => {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<string>(`${this.baseUrl}/classes/${classId}/bulk-upload`, formData, {
      headers,
    });
  };
}
