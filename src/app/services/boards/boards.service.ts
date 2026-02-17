import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBoardRequestBody, IBoard } from '../../core/interface/boards.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  baseUrl = environment.circulumAPI;
  http = inject(HttpClient);

  // default headers (will be merged with Authorization if token exists)
  headers = {
    'x-user-id': '12345465478924324',
    'x-org-id': '',
    'x-platform-role': '',
    'x-org-role': '',
  };

  private buildOptions() {
    // try common storage keys for tokens
    const token =
      localStorage.getItem('access_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('user') ||
      localStorage.getItem('auth_token');
    let httpHeaders = new HttpHeaders(this.headers as Record<string, string>);
    if (token) {
      httpHeaders = httpHeaders.set('Authorization', `Bearer ${token}`);
    }
    return { headers: httpHeaders };
  }

  createBoard = (board: IBoardRequestBody): Observable<IBoard> => {
    return this.http.post<IBoard>(`${this.baseUrl}/boards/`, board, this.buildOptions());
  };

  getAllBoards = (): Observable<IBoard[]> => {
    return this.http.get<IBoard[]>(`${this.baseUrl}/boards/`, this.buildOptions());
  };

  updateBoardById = (board_id: string, board: Partial<IBoardRequestBody>): Observable<IBoard> => {
    return this.http.patch<IBoard>(
      `${this.baseUrl}/boards/${board_id}/`,
      board,
      this.buildOptions(),
    );
  };

  deleteBoardById = (board_id: string): Observable<IBoard> => {
    return this.http.delete<IBoard>(`${this.baseUrl}/boards/${board_id}/`, this.buildOptions());
  };

  getBoadById = (board_id: string): Observable<IBoard> => {
    return this.http.get<IBoard>(`${this.baseUrl}/boards/${board_id}/`, this.buildOptions());
  };
}
