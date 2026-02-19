import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssessmentsService {
  baseUrl = environment.contentAPI;
  http = inject(HttpClient);

  uploadExamPaper = (file: File, subjectId: string, geminiKey: string) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('subject_id', subjectId);
    formData.append('gemini_key', geminiKey);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<string>(`${this.baseUrl}/upload-questions`, formData, { headers });
  };

  getQuestionsBySubjectId = (subjectId: string) => {
    return this.http.get<string>(`${this.baseUrl}/subjects/${subjectId}/questions`);
  };

  getRandomTestQuestion = (
    subjectId: string,
    questionTypes?: 'MCQ' | 'FILL_BLANK' | 'DESCRIPTIVE',
    difficulty?: 'Short Answer' | 'Medium Answer' | 'Long Answer',
    limit: number = 10,
  ) => {
    const params: any = {  limit };
    if (questionTypes) {
      params['question_types'] = questionTypes;
    }
    if (difficulty) {
      params['difficulty'] = difficulty;
    }
    return this.http.get<string>(`${this.baseUrl}/subjects/${subjectId}/questions/generate-test`, { params });
  };
}
