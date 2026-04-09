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
      `${this.baseUrl}/?org_id=${org_id}&skip=${skip}&limit=${limit}`,
    );
  };

  getSubjectById = (subject_id: string): Observable<ISubjectDetails> => {
    return this.http.get<ISubjectDetails>(`${this.baseUrl}/${subject_id}`);
  };

  /**
   * Get the fully expanded subject including chapters/content tree.
   */
  getSubjectComplete = (subject_id: string): Observable<any> => {
    return this.http.get<any>(`${this.baseUrl}/${subject_id}/complete`);
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

  /**
   * Upload a PDF to the ingestion endpoint for a given subject/org.
   * Expects a FormData with file key `file`.
   */
  ingestPdf = (
    subject_id: string,
    file: File,
    org_id: string,
    geminiApiKey: string,
  ): Observable<any> => {
    const url = `${environment.contentAPI}/ingestion/pdf?subject_id=${subject_id}&org_id=${org_id}`;
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post<any>(url, fd, {
      headers: { 'X-Gemini-API-Key': geminiApiKey },
    });
  };
}
