import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ICourse, ICreateCourse, IUpdateCourse } from '../../core/interface/courses.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  baseUrl = environment.circulumAPI + '/courses';
  http = inject(HttpClient);

  getCourses = (boardId?: string) => {
    const params: any = {};
    if (boardId) {
      params['board_id'] = boardId;
    }
    return this.http.get<ICourse>(`${this.baseUrl}/`, { params });
  };

  getCourse = (courseId: string) => {
    return this.http.get<ICourse>(`${this.baseUrl}/${courseId}`);
  };

  createCourse = (course: ICreateCourse) => {
    return this.http.post<ICourse>(`${this.baseUrl}/`, course);
  };

  updateCourse = (courseId: string, course: IUpdateCourse) => {
    return this.http.patch<ICourse>(`${this.baseUrl}/${courseId}`, course);
  };

  deleteCourse = (courseId: string) => {
    return this.http.delete<string>(`${this.baseUrl}/${courseId}`);
  };
}
