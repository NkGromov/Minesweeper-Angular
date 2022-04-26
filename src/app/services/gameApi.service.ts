import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameApiService {
  constructor(private http: HttpClient) {}

  getGame(
    userId: number,
    width: number = 10,
    height: number = 10
  ): Observable<Game<number>> {
    return this.http.post<Game<number>>(
      `${env.apiBase}/games/create`,
      {},
      {
        params: {
          width,
          height,
          userId,
        },
      }
    );
  }

  refreshGame(
    userId: number,
    gameId: number,
    width: number = 10,
    height: number = 10
  ): Observable<Game<number>> {
    return this.http.post<Game<number>>(
      `${env.apiBase}/games/refresh`,
      {},
      {
        params: {
          width,
          height,
          userId,
          gameId,
          isWin: false,
        },
      }
    );
  }

  changeWin(gameId: number, isWin: boolean): Observable<Game<number>> {
    return this.http.put<Game<number>>(
      `${env.apiBase}/games/win`,
      {},
      {
        params: {
          gameId,
          isWin,
        },
      }
    );
  }
}
