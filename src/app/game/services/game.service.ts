import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Game } from 'src/app/game/models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  getGame(
    userId: number,
    width: number = 10,
    height: number = 10
  ): Observable<Game> {
    return this.http.post<Game>(
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

  changeWin(gameId: number, isWin: boolean): Observable<Game> {
    return this.http.put<Game>(
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
