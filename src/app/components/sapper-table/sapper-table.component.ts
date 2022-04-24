import { Component, Input, OnInit } from '@angular/core';
import { Game, SapperScheme } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'sapper-table',
  templateUrl: './sapper-table.component.html',
  styleUrls: ['./sapper-table.component.sass'],
})
export class SapperTableComponent implements OnInit {
  constructor(public gameService: GameService) {}

  refreshGame(): void {
    if (this.gameService.isOver) this.gameService.getGame(1);
    else this.gameService.refreshGame(1);
  }

  ngOnInit(): void {
    this.gameService.getGame(1);
  }
}
