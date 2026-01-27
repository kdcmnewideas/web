import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IBoardRequestBody, IBoard } from '../../core/interface/boards.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  baseUrl = environment.circulumAPI;
  http = inject(HttpClient);

  headers = {
    'x-user-id': '12345465478924324',
    'x-org-id': '',
    'x-platform-role': '',
    'x-org-role': '',
  };

  createBoard = (board: IBoardRequestBody): Observable<IBoard> => {
    return this.http.post<IBoard>(`${this.baseUrl}/boards/`, board, {
      headers: this.headers,
    });
  };

  getAllBoards = (): Observable<IBoard[]> => {
    return this.http.get<IBoard[]>(`${this.baseUrl}/boards/`, {
      headers: this.headers,
    });
  };

  updateBoardById = (board_id: string, board: Partial<IBoardRequestBody>): Observable<IBoard> => {
    return this.http.patch<IBoard>(`${this.baseUrl}/boards/${board_id}/`, board, {
      headers: this.headers,
    });
  };

  deleteBoardById = (board_id: string): Observable<IBoard> => {
    return this.http.delete<IBoard>(`${this.baseUrl}/boards/${board_id}/`, {
      headers: this.headers,
    });
  };
}
