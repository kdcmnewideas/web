import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IAssessment, IAssessmentFeedback, ISubmitAssessment } from '../../core/interface/assessment.interface';

@Injectable({
  providedIn: 'root',
})
export class AssessmentsService {
  baseUrl = environment.contentAPI;
  userProgressUrl = environment.userProgressAPI + '/assessments';
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
    const params: any = { limit };
    if (questionTypes) {
      params['question_types'] = questionTypes;
    }
    if (difficulty) {
      params['difficulty'] = difficulty;
    }
    return this.http.get<string>(`${this.baseUrl}/subjects/${subjectId}/questions/generate-test`, {
      params,
    });
  };

  submitAssessment = (data: ISubmitAssessment) => {
    return this.http.post<IAssessmentFeedback>(`${this.userProgressUrl}/submit`, data);
  };

  getAssessments = (
    skip: number = 0,
    limit: number = 20,
    assignment_type?: 'QUIZ' | 'CODE' | 'VOICE' | 'TEXT',
    reference_id?: string,
    user_id?: string,
  ) => {
    const params: any = { skip, limit };
    if (assignment_type) {
      params['assignment_type'] = assignment_type;
    }
    if (reference_id) {
      params['reference_id'] = reference_id;
    }
    if (user_id) {
      params['user_id'] = user_id;
    }
    return this.http.get<IAssessment[]>(`${this.userProgressUrl}/history`, { params });
  };

  getAssessmentDetails = (assessmentId: string) => {
    return this.http.get<IAssessmentFeedback>(`${this.userProgressUrl}/${assessmentId}`);
  };
}
