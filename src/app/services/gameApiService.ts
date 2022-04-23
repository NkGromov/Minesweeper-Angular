import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse } from '../models/api';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class gameApiService {
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
}
