import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICreateClass } from '../../core/interface/classes.interface';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  baseUrl = environment.circulumAPI + '/classes';
  http = inject(HttpClient);

  createClass = (classData: ICreateClass) => {
    return this.http.post(this.baseUrl, classData);
  };
}
