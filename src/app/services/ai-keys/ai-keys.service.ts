import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IAddKey, IAiAnalytics, IAiUsage, IKey } from '../../core/interface/ai-keys.interface';

@Injectable({
  providedIn: 'root',
})
export class AiKeysService {
  baseURL = environment.userProgressAPI + '/key/';

  http = inject(HttpClient);

  getKeys = () => this.http.get<IKey>(this.baseURL);

  addKey = (key: IAddKey) => this.http.post<IKey>(this.baseURL, key);

  TrackUsage = (data: IAiUsage, keyId: string) =>
    this.http.post<string>(this.baseURL + keyId + '/usage', data);

  deleteKey = (keyId: string) => this.http.delete<string>(this.baseURL + keyId);

  getKeyAnalytics = (
    keyId: string,
    days: number = 30,
    capability?: 'TEXT' | 'IMAGE' | 'AUDIO' | 'EMBEDDING',
    startDate?: string,
    endDate?: string,
    minTokens?: number,
  ) => {
    let params: any = {
      days,
    };
    if (capability) {
      params['capability'] = capability;
    }
    if (startDate) {
      params['start_date'] = startDate;
    }
    if (endDate) {
      params['end_date'] = endDate;
    }
    if (minTokens) {
      params['min_tokens'] = minTokens;
    }
    return this.http.get<IAiAnalytics>(`${this.baseURL}/${keyId}/analytics`, { params });
  };
}
