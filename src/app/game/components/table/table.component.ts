import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { bombNumber } from 'src/app/config/game';
import {
  CellWithState,
  Coords,
  Game,
  QueryParams,
} from 'src/app/game/models/game';
import { GameService } from 'src/app/game/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'game-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
})
export class TableComponent implements OnInit, DoCheck {
  private timerId: ReturnType<typeof setInterval> = setInterval(() => {}, 0);
  countBombs = 0;
  game = {} as Game;
  isOver = false;
  isWin = false;
  countOfCell = 100;
  cellMap = [] as Array<Array<CellWithState>>;
  score = 0;
  params = {} as QueryParams;
  constructor(
    public gameService: GameService,
    public userService: UserService,
    private route: ActivatedRoute
  ) {}

  public startGame(): void {
    this.countOfCell = 100;
    const { width, height } = this.params;
    this.gameService
      .getGame(this.userService.userId, +width, +height)
      .subscribe((response: Game) => {
        this.game = response;
        this.countOfCell = +width * +height - response.sapperSchemes.countBombs;
        this.countBombs = response.sapperSchemes.countBombs;
        this.cellMap = this.game.sapperSchemes.scheme.map((row, rowIndex) =>
          row.map((cell, cellIndex) => ({
            value: cell,
            isOpen: false,
            isPress: false,
            countNearbyFlags: 0,
            isFlag: false,
            coords: { x: cellIndex, y: rowIndex },
          }))
        );
        this.initVariable(false, false);
        this.setTimer(true);
      });
  }

  public endGame(isWin: boolean) {
    this.initVariable(true, isWin);
    this.gameService.changeWin(this.game.id, isWin, this.score).subscribe();
    this.setTimer(false);
  }

  public changeOpenCell(coords: Coords) {
    const currentCell = this.cellMap[coords.y][coords.x];
    if (currentCell.isOpen || currentCell.isFlag) return;
    currentCell.isOpen = true;
    this.countOfCell--;
  }

  public onCellClick(coords: Coords): void {
    const currentCell = this.cellMap[coords.y][coords.x];
    this.onPressNearbyCells(coords, false);
    if (currentCell.isFlag) return;
    if (
      currentCell.value === 0 ||
      currentCell.value === currentCell.countNearbyFlags
    )
      this.changeNearbyCells(coords, this.nearbyOpen);
    if (currentCell.value === bombNumber) this.endGame(false);
    this.changeOpenCell(coords);
  }

  public setFlag(coords: Coords): void {
    const currentCell = this.cellMap[coords.y][coords.x];
    if (currentCell.isOpen) return;
    currentCell.isFlag = !currentCell.isFlag;
    if (currentCell.isFlag) this.countBombs--;
    else this.countBombs++;
    this.changeNearbyCells(
      coords,
      this.nearbyFlag.bind(this, currentCell.isFlag)
    );
  }

  public onPressNearbyCells(coords: Coords, isPress = true): void {
    this.changeNearbyCells(coords, this.nearbyPress.bind(this, isPress));
  }

  private initVariable(isOver: boolean, isWin: boolean): void {
    this.isOver = isOver;
    this.isWin = isWin;
  }

  private setTimer(isStarted: boolean): void {
    clearInterval(this.timerId);
    if (isStarted) {
      this.score = 0;
      this.timerId = setInterval(() => this.score++, 1000);
    }
  }

  private changeNearbyCells(
    start: Coords,
    strategy: (coords: Coords) => void
  ): void {
    for (let row = -1; row <= 1; row++) {
      for (let coll = -1; coll <= 1; coll++) {
        const currentCell = this.cellMap?.[row + start.y]?.[coll + start.x];
        if (currentCell)
          strategy.call(this, {
            x: currentCell.coords.x,
            y: currentCell.coords.y,
          });
      }
    }
  }

  private nearbyOpen(coords: Coords): void {
    const currentCell = this.cellMap[coords.y][coords.x];
    if (currentCell.isOpen) return;
    this.changeOpenCell(coords);
    if (currentCell.value === 0)
      this.changeNearbyCells(coords, this.nearbyOpen);
  }

  private nearbyPress(isPress: boolean, coords: Coords): void {
    const currentCell = this.cellMap[coords.y][coords.x];
    currentCell.isPress = isPress;
  }

  private nearbyFlag(isFlag: boolean, coords: Coords): void {
    const currentCell = this.cellMap[coords.y][coords.x];
    if (isFlag) currentCell.countNearbyFlags++;
    else currentCell.countNearbyFlags--;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params.width = params['width'] || 10;
      this.params.height = params['height'] || 10;
    });

    this.startGame();
  }

  ngDoCheck(): void {
    if (this.countOfCell === 0 && !this.isOver) this.endGame(true);
    if (
      this.cellMap.some((row) =>
        row.some((cell) => cell.value === bombNumber && cell.isOpen)
      ) &&
      !this.isOver
    )
      this.endGame(false);
  }
}
