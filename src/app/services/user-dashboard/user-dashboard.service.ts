import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  IMasteryReport,
  IScoreTrend,
  IUserStats,
} from '../../core/interface/user-dashboard.interface';
import { IAssessment } from '../../core/interface/assessment.interface';

@Injectable({
  providedIn: 'root',
})
export class UserDashboardService {
  baseURL = environment.userProgressAPI + '/dashboard';

  http = inject(HttpClient);

  getUserStats = (userId: string) =>
    this.http.get<IUserStats>(this.baseURL, { params: { user_id: userId } });

  getRecentExams = (userId: string, assignmentType?: 'QUIZ' | 'CODE' | 'VOICE' | 'TEXT') => {
    let params: any = { user_id: userId };
    if (assignmentType) {
      params['assignment_type'] = assignmentType;
    }
    return this.http.get<IAssessment[]>(this.baseURL + '/recent', { params });
  };

  getScoreTrend = (userId: string, days: number = 30) => {
    return this.http.get<IScoreTrend[]>(this.baseURL + '/trend', {
      params: { user_id: userId, days },
    });
  };

  getMastryReport = (userId: string) => {
    return this.http.get<IMasteryReport>(this.baseURL + '/mastery', {
      params: { user_id: userId },
    });
  };
}
