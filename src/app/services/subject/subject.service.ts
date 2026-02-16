import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  ISubject,
  ISubjectResponse,
  ISubjectDetails,
} from '../../core/interface/subject.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  baseUrl = environment.contentAPI + '/subjects';
  http = inject(HttpClient);

  createSubject = (subject: ISubject): Observable<ISubjectResponse> => {
    return this.http.post<ISubjectResponse>(`${this.baseUrl}/`, subject);
  };

  listAllSubjects = (
    org_id: string,
    skip: number,
    limit: number,
  ): Observable<ISubjectResponse[]> => {
    return this.http.get<ISubjectResponse[]>(
      `${this.baseUrl}/?org_id=${org_id}&skip=${skip}&limit=${limit} `,
    );
  };

  getSubjectById = (subject_id: string): Observable<ISubjectDetails> => {
    return this.http.get<ISubjectDetails>(`${this.baseUrl}/${subject_id}/`);
  };

  updateSubjectById = (
    subject_id: string,
    subject: Partial<ISubject>,
  ): Observable<ISubjectResponse> => {
    return this.http.patch<ISubjectResponse>(`${this.baseUrl}/${subject_id}/`, subject);
  };

  deleteSubjectById = (subject_id: string): Observable<string> => {
    return this.http.delete<string>(`${this.baseUrl}/${subject_id}/`);
  };
}
