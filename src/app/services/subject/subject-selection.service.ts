import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SelectedSubject {
  id: string;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class SubjectSelectionService {
  private _selection = new BehaviorSubject<SelectedSubject | null>(null);

  select(subject: SelectedSubject | null) {
    this._selection.next(subject);
  }

  get selection$(): Observable<SelectedSubject | null> {
    return this._selection.asObservable();
  }

  get current(): SelectedSubject | null {
    return this._selection.getValue();
  }
}
