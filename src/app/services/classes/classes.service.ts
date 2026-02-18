import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IClass, ICreateClass, IUpdateClass } from '../../core/interface/classes.interface';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  baseUrl = environment.circulumAPI + '/classes';
  http = inject(HttpClient);

  getHeaders = (user: any) => {
    let httpHeaders = new HttpHeaders();

    if (user.org_role && user.org_id) {
      httpHeaders = httpHeaders.set('X-Org-ID', user.org_id);
      httpHeaders = httpHeaders.set('X-Org-Role', user.org_role);
    }
    return httpHeaders;
  };

  getClasses = (userDetails: any, course_id?: string, skip: number = 0, limit: number = 100, include_archived: boolean = false) => {
    const params: any = { skip, limit, include_archived };
    if (course_id) {
      params['course_id'] = course_id;
    }
    const headers = this.getHeaders(userDetails);
    return this.http.get<IClass[]>(this.baseUrl, { headers, params });
  };

  createClass = (classData: ICreateClass, userDetails: any) => {
    const headers = this.getHeaders(userDetails);
    return this.http.post<IClass>(this.baseUrl, classData, { headers });
  };

  updateClass = (classId: string, classData: IUpdateClass, userDetails: any) => {
    const headers = this.getHeaders(userDetails);
    return this.http.put<IClass>(`${this.baseUrl}/${classId}`, classData, {
      headers,
    });
  };

  deleteClass = (classId: string, userDetails: any) => {
    const headers = this.getHeaders(userDetails);
    return this.http.delete<string>(`${this.baseUrl}/${classId}`, { headers });
  };
}
