import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBoardRequestBody, IBoard } from '../../core/interface/boards.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  baseUrl = environment.circulumAPI + '/boards';
  http = inject(HttpClient);

  createBoard = (board: IBoardRequestBody): Observable<IBoard> => {
    return this.http.post<IBoard>(`${this.baseUrl}/`, board);
  };

  getAllBoards = (): Observable<IBoard[]> => {
    return this.http.get<IBoard[]>(`${this.baseUrl}/`);
  };

  updateBoardById = (board_id: string, board: Partial<IBoardRequestBody>): Observable<IBoard> => {
    return this.http.patch<IBoard>(`${this.baseUrl}/${board_id}`, board);
  };

  deleteBoardById = (board_id: string): Observable<IBoard> => {
    return this.http.delete<IBoard>(`${this.baseUrl}/${board_id}`);
  };

  getBoadById = (board_id: string): Observable<IBoard> => {
    return this.http.get<IBoard>(`${this.baseUrl}/${board_id}`);
  };
}
