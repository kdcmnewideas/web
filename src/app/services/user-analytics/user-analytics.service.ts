import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  IReadinessReport,
  ITopicMastery,
  ITrackTimeRequest,
} from '../../core/interface/user-analytics.interface';

@Injectable({
  providedIn: 'root',
})
export class UserAnalyticsService {
  baseURL = environment.userProgressAPI + '/analytics/';

  http = inject(HttpClient);

  trackTime = (data: ITrackTimeRequest, user_id: string) =>
    this.http.post<string>(this.baseURL + 'track-time', data, { params: { user_id } });

  getReadinessReport = (userId: string, subject_id: string) =>
    this.http.get<IReadinessReport>(this.baseURL + 'readiness/' + subject_id, {
      params: { user_id: userId },
    });

  getTopicMastery = (userId: string, topic_id: string) =>
    this.http.get<ITopicMastery>(this.baseURL + 'mastery/' + topic_id, {
      params: { user_id: userId },
    });
}
