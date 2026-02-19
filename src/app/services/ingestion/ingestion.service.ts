import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  IDBHealth,
  IIngestion,
  IIngestionExtimate,
  IIngestionJob,
  IIngestionJobList,
  IIngestionMetrics,
  IIngestionProgress,
  IJobContent,
} from '../../core/interface/ingestion.interface';

@Injectable({
  providedIn: 'root',
})
export class IngesionService {
  baseUrl = environment.contentAPI;

  http = inject(HttpClient);

  injectPdf = (
    file: File,
    subject_id: string,
    org_id: string,
    gemini_key: string,
  ): Observable<IIngestion> => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    headers = headers.set('X-Gemini-API-Key ', gemini_key);

    const params = { subject_id, org_id };
    headers = headers.set('X-Params', JSON.stringify(params));

    return this.http.post<IIngestion>(`${this.baseUrl}/ingestion/pdf`, formData, {
      headers,
      params,
    });
  };

  estimateProcessCost = (
    file: File,
    model: string = 'gemini-2.5-pro',
  ): Observable<IIngestionExtimate> => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<IIngestionExtimate>(`${this.baseUrl}/ingestion/pdf/estimate`, formData, {
      params: { model },
    });
  };

  getIngestionJobStatus = (jobId: string): Observable<IIngestionProgress> => {
    return this.http.get<IIngestionProgress>(`${this.baseUrl}/jobs/${jobId}/status`);
  };

  getIngestionJobs = (
    skip = 0,
    limit = 100,
    filter?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED',
  ): Observable<IIngestionJobList> => {
    return this.http.get<IIngestionJobList>(
      `${this.baseUrl}/jobs?skip=${skip}&limit=${limit}${filter ? `&status_filter=${filter}` : ''}`,
    );
  };

  cancelJob = (jobId: string): Observable<string> => {
    return this.http.delete<string>(`${this.baseUrl}/jobs/${jobId}/cancel`);
  };

  getJobcontent = (jobId: string): Observable<IJobContent> => {
    return this.http.get<IJobContent>(`${this.baseUrl}/jobs/${jobId}/content`);
  };

  getIngestionDbHealth = (): Observable<IDBHealth> => {
    return this.http.get<IDBHealth>(`${this.baseUrl}/health`);
  };

  getMetrics = (): Observable<IIngestionMetrics> => {
    return this.http.get<IIngestionMetrics>(`${this.baseUrl}/metrics`);
  };

}
