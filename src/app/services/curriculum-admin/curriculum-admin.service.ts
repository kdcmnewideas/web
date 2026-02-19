import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ITopic } from '../../core/interface/ingestion.interface';
import { IGenerateAIContent } from '../../core/interface/curriculum-admin.interface';

@Injectable({
  providedIn: 'root',
})
export class CurriculumAdminService {
  baseUrl = environment.contentAPI;
  http = inject(HttpClient);


  getAllChapterTopics = (chapterId: string) => {
    return this.http.get(`${this.baseUrl}/chapters/${chapterId}/topics/all`);
  }

  createTopic = (chapterId: string, title: string) => {
    return this.http.post<ITopic>(`${this.baseUrl}/topics`, { chapter_id: chapterId, title });
  }

  geterateContentWithAI = (topicId: string, body: IGenerateAIContent) => {
    return this.http.post<string>(`${this.baseUrl}/topics/${topicId}/subtopics/generate`,  body );
  }

  updateTopic = (topicId: string, status: string) => {
    return this.http.patch<ITopic>(`${this.baseUrl}/topics/${topicId}/status`, { status });
  }

}
