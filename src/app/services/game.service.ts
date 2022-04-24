import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { Game, Scheme } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Game;
  isOver = false;
  constructor(private http: HttpClient) {
    this.game = { id: 0, isWin: false, sapperSchemes: { id: 0, scheme: [] } };
  }

  getGame(userId: number, width: number = 10, height: number = 10) {
    this.http
      .post<Game>(
        `${env.apiBase}/games/create`,
        {},
        {
          params: {
            width,
            height,
            userId,
          },
        }
      )
      .subscribe((response: Game) => {
        const scheme: Scheme[][] = [];
        this.game = response;
        response.sapperSchemes.scheme.forEach((row) => {
          scheme.push(
            // @ts-ignore
            row.map((value) => ({
              value: value,
              isHide: true,
              isSetFlag: false,
            }))
          );
        });
        this.game.sapperSchemes.scheme = scheme;
        this.isOver = false;
      });
  }

  refreshGame(userId: number, width: number = 10, height: number = 10) {
    this.http
      .post<Game>(
        `${env.apiBase}/games/refresh`,
        {},
        {
          params: {
            width,
            height,
            userId,
            gameId: this.game.id,
            isWin: this.game.isWin,
          },
        }
      )
      .subscribe((response: Game) => {
        const scheme: Scheme[][] = [];
        this.game = response;
        response.sapperSchemes.scheme.forEach((row) => {
          scheme.push(
            // @ts-ignore
            row.map((value) => ({
              value: value,
              isHide: true,
              isSetFlag: false,
            }))
          );
        });
        this.game.sapperSchemes.scheme = scheme;
        this.isOver = false;
      });
  }

  endGame() {
    this.http.put<Game>(
      `${env.apiBase}/games/win`,
      {},
      {
        params: {
          gameId: this.game.id,
          isWin: this.game.isWin,
        },
      }
    );
  }

  onSetFlag(x: number, y: number): void {
    if (this.isOver) return;
    const cell = this.game.sapperSchemes.scheme[y][x];
    if (cell.isHide) cell.isSetFlag = !cell.isSetFlag;
  }

  onCellClick(x: number, y: number): void {
    const cell = this.game.sapperSchemes.scheme[y][x];
    const scheme = this.game.sapperSchemes.scheme;
    if (cell.isSetFlag || this.isOver) return;

    if (cell.isHide) cell.isHide = false;
    switch (cell.value) {
      case 100:
        for (let i = 0; i < scheme.length; i++) {
          const row = scheme[i];
          for (let j = 0; j < row.length; j++) {
            const currentCell = row[j];
            if (currentCell.value === 100 && !currentCell.isSetFlag)
              this.game.sapperSchemes.scheme[i][j].isHide = false;
          }
        }
        this.isOver = true;
        this.endGame();
        break;

      default:
        this.loopDown(scheme, y, x);
        this.loopUp(scheme, y, x);
        break;
    }
  }
  private setIsHideInLoop(x: number, y: number): void {
    const currentCell = this.game.sapperSchemes.scheme[y][x];
    if (
      (currentCell.value === 0 || currentCell.value < 100) &&
      !currentCell.isSetFlag
    )
      this.game.sapperSchemes.scheme[y][x].isHide = false;
  }

  private loopLeft(row: Scheme[], y: number, x: number): void {
    for (let j = x; j >= 0; j--) {
      const currentCell = row[j];
      if (currentCell.value === 100) break;
      this.setIsHideInLoop(j, y);
    }
  }

  private loopRight(row: Scheme[], y: number, x: number): void {
    for (let j = x; j < row.length; j++) {
      const currentCell = row[j];
      if (currentCell.value === 100) break;
      this.setIsHideInLoop(j, y);
    }
  }

  private loopDown(scheme: Scheme[][], y: number, x: number): void {
    for (let i = y; i < scheme.length; i++) {
      const row = scheme[i];
      this.loopRight(row, i, x);
      this.loopLeft(row, i, x);
    }
  }

  private loopUp(scheme: Scheme[][], y: number, x: number): void {
    for (let i = y; i >= 0; i--) {
      const row = scheme[i];
      this.loopRight(row, i, x);
      this.loopLeft(row, i, x);
    }
  }
}
