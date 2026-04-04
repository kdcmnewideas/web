import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IFlowStatus } from '../../core/interface/content-flow-mapper.interface';

@Injectable({
  providedIn: 'root',
})
export class ContentFlowMapperService {
  baseUrl = environment.contentAPI + '/flow';
  http = inject(HttpClient);

  startFlowAnalyze = (subjectId: string, geminiKey: string) => {
    const params = { subject_id: subjectId, gemini_key: geminiKey };
    return this.http.post<string>(`${this.baseUrl}/analyze`, {}, { params });
  };

  getFlowStatus = (flowId: string) => {
    return this.http.get<IFlowStatus>(`${this.baseUrl}/status/${flowId}`);
  };

  reviewLink = (linkId: string, status: string) => {
    const params = { status };
    return this.http.patch<string>(`${this.baseUrl}/links/${linkId}/review`, {}, { params });
  };

  editLink = (linkId: string, relation_type: string, reasoning: string) => {
    const params = { relation_type, reasoning };
    return this.http.patch<string>(`${this.baseUrl}/links/${linkId}`, {}, { params });
  };

  removeLink = (linkId: string) => {
    return this.http.delete<string>(`${this.baseUrl}/links/${linkId}`);
  };

  addMissingConcept = (suggestionId: string, subtopicTitle: string, contentSummary: string) => {
    const params = { subtopic_title: subtopicTitle, content_summary: contentSummary };
    return this.http.patch<string>(`${this.baseUrl}/suggestions/${suggestionId}`, {}, { params });
  };

  removeSuggestion = (suggestionId: string) => {
    return this.http.delete<string>(`${this.baseUrl}/suggestions/${suggestionId}`);
  };

  triggerContentGeneration = (suggestionId: string, geminiKey: string) => {
    return this.http.post<string>(
      `${this.baseUrl}/suggestions/${suggestionId}/generate?gemini_key=${geminiKey}`,
      {},
    );
  };

  approveSuggestion = (suggestionId: string) => {
    return this.http.patch<string>(`${this.baseUrl}/suggestions/${suggestionId}/approve`, {});
  };
}
