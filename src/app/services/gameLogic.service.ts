import { Injectable } from '@angular/core';
import { Game, SchemeWithState } from '../models/game';
import { GameApiService } from './gameApi.service';

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  game: Game<SchemeWithState>;
  isOver = false;
  countOfCell = 10 * 10 - 10;

  constructor(private gameApiService: GameApiService) {
    this.game = { id: 0, isWin: false, sapperSchemes: { id: 0, scheme: [] } };
  }

  getGame(userId: number, width: number = 10, height: number = 10) {
    this.gameApiService
      .getGame(userId, width, height)
      .subscribe(
        (response: Game<number>) => (this.game = this.gamesStart(response))
      );
  }

  refreshGame(userId: number, width: number = 10, height: number = 10) {
    this.gameApiService
      .refreshGame(userId, this.game.id, width, height)
      .subscribe(
        (response: Game<number>) => (this.game = this.gamesStart(response))
      );
  }

  endGame(isWin: boolean) {
    this.isOver = true;
    this.gameApiService
      .changeWin(this.game.id, isWin)
      .subscribe(
        (response: Game<number>) => (this.game.isWin = response.isWin)
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

    switch (cell.value) {
      case 100:
        for (let i = 0; i < scheme.length; i++) {
          const row = scheme[i];
          for (let j = 0; j < row.length; j++) {
            const currentCell = row[j];
            if (currentCell.value === 100 && !currentCell.isSetFlag)
              currentCell.isHide = false;
          }
        }

        this.endGame(false);
        break;

      default:
        this.loopDown(scheme, y, x);
        this.loopUp(scheme, y, x);
        break;
    }
  }

  private gamesStart(response: Game<number>): Game<SchemeWithState> {
    this.isOver = false;
    this.countOfCell = 10 * 10 - 10;
    return this.convertToGameState(response);
  }

  private convertToGameState(response: Game<number>): Game<SchemeWithState> {
    return {
      id: response.id,
      isWin: response.isWin,
      sapperSchemes: {
        id: response.sapperSchemes.id,
        scheme: response.sapperSchemes.scheme.map((row) =>
          row.map((value) => ({
            value: value,
            isHide: true,
            isSetFlag: false,
          }))
        ),
      },
    };
  }

  private setIsHideInLoop(x: number, y: number): void {
    const currentCell = this.game.sapperSchemes.scheme[y][x];

    if (
      currentCell.value < 100 &&
      !currentCell.isSetFlag &&
      currentCell.isHide
    ) {
      currentCell.isHide = false;
      this.countOfCell--;
      if (this.countOfCell <= 0) {
        this.endGame(true);
        alert('you win :)');
      }
    }
  }

  private loopLeft(row: SchemeWithState[], y: number, x: number): void {
    for (let j = x; j >= 0; j--) {
      const currentCell = row[j];
      this.setIsHideInLoop(j, y);
      if (currentCell.value && currentCell.value < 100) break;
    }
  }

  private loopRight(row: SchemeWithState[], y: number, x: number): void {
    for (let j = x; j < row.length; j++) {
      const currentCell = row[j];
      this.setIsHideInLoop(j, y);
      if (currentCell.value && currentCell.value < 100) break;
    }
  }

  private loopDown(scheme: SchemeWithState[][], y: number, x: number): void {
    for (let i = y; i < scheme.length; i++) {
      const row = scheme[i];
      this.loopRight(row, i, x);
      this.loopLeft(row, i, x);
    }
  }

  private loopUp(scheme: SchemeWithState[][], y: number, x: number): void {
    for (let i = y; i >= 0; i--) {
      const row = scheme[i];
      this.loopRight(row, i, x);
      this.loopLeft(row, i, x);
    }
  }
}
