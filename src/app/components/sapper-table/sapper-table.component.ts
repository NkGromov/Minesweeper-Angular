import { Component, Input, OnInit } from '@angular/core';
import { Game, SapperScheme } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sapper-table',
  templateUrl: './sapper-table.component.html',
  styleUrls: ['./sapper-table.component.sass'],
})
export class SapperTableComponent implements OnInit {
  constructor(
    public gameService: GameService,
    private userService: UserService
  ) {}

  refreshGame(): void {
    if (this.gameService.isOver)
      this.gameService.getGame(this.userService.userId);
    else this.gameService.refreshGame(this.userService.userId);
  }

  ngOnInit(): void {
    this.gameService.getGame(this.userService.userId);
  }
}
