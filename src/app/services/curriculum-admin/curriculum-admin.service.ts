import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurriculumAdminService {
  baseUrl = environment.contentAPI;
  http = inject(HttpClient);

  // getAllTopicsByChapterId = (chapter_id: string): Observable<any> => {};
}
