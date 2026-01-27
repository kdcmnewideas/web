import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  baseUrl = environment.contentAPI;

  http = inject(HttpClient);

  getSubjectContentById = (subject_id: string): Observable<any> => {
    return this.http.get(`${this.baseUrl}/subjects/${subject_id}`);
  };
}
