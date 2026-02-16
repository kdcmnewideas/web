import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IIngestionResponse, IIngestionJob } from '../../core/interface/ingestion.interface';

@Injectable({
  providedIn: 'root',
})
export class IngesionService {
  baseUrl = environment.contentAPI;

  http = inject(HttpClient);

  injectPdf = (file: File): Observable<IIngestionResponse> => {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<IIngestionResponse>(`${this.baseUrl}/contents/upload`, formData);
  };

  getIngestionJobs = (skip = 0, limit = 100): Observable<IIngestionJob[]> => {
    return this.http.get<IIngestionJob[]>(`${this.baseUrl}/jobs?skip=${skip}&limit=${limit}`);
  };

  getIngestionJobById = (jobId: string): Observable<IIngestionJob> => {
    return this.http.get<IIngestionJob>(`${this.baseUrl}/jobs/${jobId}/content`);
  };
}
