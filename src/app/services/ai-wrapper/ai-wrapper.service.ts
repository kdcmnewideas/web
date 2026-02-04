import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IModuleRequest } from '../../core/interface/ai-wrapper.interface';

@Injectable({
  providedIn: 'root',
})
export class AiWrapperService {
  baseUrl = environment.aiwrapper;

  private http = inject(HttpClient);

  getData(data: IModuleRequest) {
    return this.http.post(`${this.baseUrl}/generate-module`, data);
  }
}
