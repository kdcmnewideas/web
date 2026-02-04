import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface IAiWrapper{
  content?: string,
  subject?: string,
  topic?: string
}

@Injectable({
  providedIn: 'root',
})
export class AiWrapperService {
  baseUrl = environment.aiwrapper;

  private http = inject(HttpClient);

  getData(data: IAiWrapper){
    return this.http.post(`${this.baseUrl}/generate-module`, data);
  }

}
