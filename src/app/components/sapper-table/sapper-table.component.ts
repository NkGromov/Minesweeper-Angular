import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/api';
import { Game, SapperScheme } from 'src/app/models/game';
import { gameApiService } from 'src/app/services/gameApiService';

@Component({
  selector: 'sapper-table',
  templateUrl: './sapper-table.component.html',
  styleUrls: ['./sapper-table.component.sass'],
})
export class SapperTableComponent implements OnInit {
  game: SapperScheme;
  constructor(private gameApi: gameApiService) {
    this.game = { id: 0, scheme: [] };
  }

  ngOnInit(): void {
    this.gameApi
      .getGame(1)
      .subscribe((response: Game) => (this.game = response.sapperSchemes));
  }
}
