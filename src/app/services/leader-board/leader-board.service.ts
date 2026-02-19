import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  IContentLevel,
  IMyRank,
  IRanking,
  ITop10Request,
} from '../../core/interface/leader-board.interface';

@Injectable({
  providedIn: 'root',
})
export class LeaderBoardService {
  baseURL = environment.userProgressAPI + '/leaderboard';

  http = inject(HttpClient);

  getTop10 = (body: ITop10Request, scope: 'GLOBAL' | 'LOCAL' | 'SCHOOL' | 'FRIENDS' = 'GLOBAL') => {
    return this.http.post<IRanking>(`${this.baseURL}/top-10`, body, {
      params: {
        scope,
      },
    });
  };

  contentLevel = (body: IContentLevel) =>
    this.http.post<IRanking>(`${this.baseURL}/content-level`, body);

  getMyRank = (
    orgId?: string,
    referenceId?: string,
    userId?: string,
    scope: 'GLOBAL' | 'LOCAL' | 'SCHOOL' | 'FRIENDS' = 'GLOBAL',
  ) => {
    let params: any = { scope };
    if (orgId) {
      params['org_id'] = orgId;
    }
    if (referenceId) {
      params['reference_id'] = referenceId;
    }
    if (userId) {
      params['user_id'] = userId;
    }
    this.http.get<IMyRank>(`${this.baseURL}/my-rank`, { params });
  };
}
