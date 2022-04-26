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

  constructor(
    public gameService: GameService,
    private userService: UserService
  ) {}

  startGame(): void {
    this.isOver = false;
    this.isWin = false;
    this.countOfCell = 5 * 5 - 3;
    this.gameService
      .getGame(this.userService.userId)
      .subscribe((response: Game) => (this.game = response));
  }

  decrementCountOfCell(): void {
    this.countOfCell--;
  }

  endGame(isWin: boolean) {
    this.isOver = true;
    this.isWin = isWin;
    this.gameService.changeWin(this.game.id, isWin).subscribe();
    alert(isWin);
  }

  ngOnInit(): void {
    this.startGame();
  }

  ngDoCheck(): void {
    if (this.countOfCell === 0 && !this.isOver) this.endGame(true);
  }
}
