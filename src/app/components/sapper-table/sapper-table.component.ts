import { Component, DoCheck, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sapper-table',
  templateUrl: './sapper-table.component.html',
  styleUrls: ['./sapper-table.component.sass'],
})
export class SapperTableComponent implements OnInit, DoCheck {
  game: Game = {
    id: 0,
    isWin: false,
    sapperSchemes: { id: 0, scheme: [] },
  };
  isOver = false;
  isWin = false;
  countOfCell = 5 * 5 - 3;
  openCells: Array<Array<boolean>> = this.game.sapperSchemes.scheme.map((row) =>
    row.map(() => false)
  );
  constructor(
    public gameService: GameService,
    private userService: UserService
  ) {}

  initVariable(isOver: boolean, isWin: boolean): void {
    this.isOver = isOver;
    this.isWin = isWin;
  }

  startGame(): void {
    this.initVariable(false, false);
    this.countOfCell = 5 * 5 - 3;
    this.gameService
      .getGame(this.userService.userId)
      .subscribe((response: Game) => {
        this.game = response;
        this.openCells = this.game.sapperSchemes.scheme.map((row) =>
          row.map(() => false)
        );
      });
  }

  decrementCountOfCell(): void {
    this.countOfCell--;
  }

  endGame(isWin: boolean) {
    this.initVariable(true, isWin);
    this.gameService.changeWin(this.game.id, isWin).subscribe();
    alert(isWin);
  }

  openNearbyCells(start: { x: number; y: number }): void {
    for (let row = -1; row <= 1; row++) {
      for (let coll = -1; coll <= 1; coll++) {
        const rowIndex = row + start.y;
        const collIndex = coll + start.x;
        if (
          typeof this.openCells[rowIndex] === 'object' &&
          typeof this.openCells[rowIndex][collIndex] === 'boolean' &&
          this.openCells[rowIndex][collIndex] === false
        ) {
          this.openCells[rowIndex][collIndex] = true;
          if (this.game.sapperSchemes.scheme[rowIndex][collIndex] === 0)
            this.openNearbyCells({ x: collIndex, y: rowIndex });
        }
      }
    }
  }

  ngOnInit(): void {
    this.startGame();
  }

  ngDoCheck(): void {
    if (this.countOfCell === 0 && !this.isOver) this.endGame(true);
  }
}
