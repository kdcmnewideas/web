import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  IAssetUploadResponse,
  IStudentEnrollRequest,
  IStudentEnrollResponse,
} from '../../core/interface/curriculum.interface';
import { ISubjectContent } from '../../core/interface/ingestion.interface';

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  baseUrl = environment.contentAPI;
  http = inject(HttpClient);

  enrollStudent = (body: IStudentEnrollRequest) => {
    return this.http.post<IStudentEnrollResponse>(`${this.baseUrl}/enroll`, body);
  };

  assestsUpload = (
    file: File,
    subtopic_id: string,
    subject_id: string,
    topic_id: string,
    org_id: string,
    asset_type: 'image' | 'infographic' | 'flowchart' | 'ppt',
    gemini_key: string,
  ) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('subtopic_id', subtopic_id);
    formData.append('subject_id', subject_id);
    formData.append('topic_id', topic_id);
    formData.append('org_id', org_id);
    formData.append('asset_type', asset_type);
    formData.append('gemini_key', gemini_key);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<IAssetUploadResponse>(`${this.baseUrl}/assets/upload`, formData, { headers });
  };

  getCompleteSubjectContent = (subject_id: string) => {
    return this.http.get<ISubjectContent>(`${this.baseUrl}/subjects/${subject_id}/complete`);
  };
}
