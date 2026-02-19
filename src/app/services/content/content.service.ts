import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IChapterData, ISubjectData, ITopicData } from '../../core/interface/content.interface';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  baseUrl = environment.contentAPI;
  http = inject(HttpClient);

  getSubjectContent = (subjectId: string) => {
    return this.http.get<ISubjectData>(`${this.baseUrl}/subjects/${subjectId}/content`);
  };

  getChapterContent = (chapterId: string) => {
    return this.http.get<IChapterData>(`${this.baseUrl}/chapters/${chapterId}/content`);
  };

  getTopicContent = (topicId: string) => {
    return this.http.get<ITopicData>(`${this.baseUrl}/topics/${topicId}/content`);
  };
}
