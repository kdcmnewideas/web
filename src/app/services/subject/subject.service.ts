import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  ISubjectDetails,
  IUpdateSubject,
  ICreateSubject,
} from '../../core/interface/subject.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  baseUrl = environment.contentAPI + '/subjects';
  http = inject(HttpClient);

  createSubject = (subject: ICreateSubject): Observable<ISubjectDetails> => {
    return this.http.post<ISubjectDetails>(`${this.baseUrl}/`, subject);
  };

  listAllSubjects = (
    org_id: string,
    skip: number = 0,
    limit: number = 100,
  ): Observable<ISubjectDetails[]> => {
    return this.http.get<ISubjectDetails[]>(
      `${this.baseUrl}/?org_id=${org_id}&skip=${skip}&limit=${limit} `,
    );
  };

  getSubjectById = (subject_id: string): Observable<ISubjectDetails> => {
    return this.http.get<ISubjectDetails>(`${this.baseUrl}/${subject_id}`);
  };

  updateSubjectById = (
    subject_id: string,
    subject: IUpdateSubject,
  ): Observable<ISubjectDetails> => {
    return this.http.patch<ISubjectDetails>(`${this.baseUrl}/${subject_id}`, subject);
  };

  deleteSubjectById = (subject_id: string): Observable<string> => {
    return this.http.delete<string>(`${this.baseUrl}/${subject_id}`);
  };
}
