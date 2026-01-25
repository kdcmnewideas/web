import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateGoal, IGoal, IUpdateGoal } from '../../core/interface/goal.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  baseURL = environment.userProgressAPI + '/goals/';

  http = inject(HttpClient);

  createGoal = (data: ICreateGoal): Observable<IGoal> => this.http.post<IGoal>(this.baseURL, data);

  getGoal = (userId: string): Observable<IGoal[]> =>
    this.http.get<IGoal[]>(this.baseURL, { params: { user_id: userId } });

  getGoalbyId = (goalId: string): Observable<IGoal> => this.http.get<IGoal>(this.baseURL + goalId);

  updateGoal = (goalId: string, data: IUpdateGoal): Observable<IGoal> =>
    this.http.put<IGoal>(this.baseURL + goalId, data);
}
