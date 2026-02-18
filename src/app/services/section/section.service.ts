import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ICreateSection, ISection } from '../../core/interface/section.interface';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  baseUrl = environment.circulumAPI + '/sections';
  http = inject(HttpClient);

  getHeaders = (user: any) => {
    let httpHeaders = new HttpHeaders();

    if (user.org_role && user.org_id) {
      httpHeaders = httpHeaders.set('X-Org-ID', user.org_id);
      httpHeaders = httpHeaders.set('X-Org-Role', user.org_role);
    }
    return httpHeaders;
  };

  getSections = (userDetails: any, course_id?: string) => {
    const params: any = { };
    if (course_id) {
      params['course_id'] = course_id;
    }
    const headers = this.getHeaders(userDetails);
    return this.http.get<ISection[]>(this.baseUrl, { headers, params });
  };

  createSection = (sectionData: ICreateSection, userDetails: any) => {
    const headers = this.getHeaders(userDetails);
    return this.http.post<ISection>(this.baseUrl, sectionData, { headers });
  };

  updateSection = (sectionId: string, sectionData: ISection, userDetails: any) => {
    const headers = this.getHeaders(userDetails);
    return this.http.put<ISection>(`${this.baseUrl}/${sectionId}`, sectionData, {
      headers,
    });
  };

  deleteSection = (sectionId: string, userDetails: any) => {
    const headers = this.getHeaders(userDetails);
    return this.http.delete<ISection>(`${this.baseUrl}/${sectionId}`, { headers });
  };
}
