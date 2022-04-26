import { Component, Input } from '@angular/core';
import { Event } from '@angular/router';
import { SchemeWithState } from 'src/app/models/game';
import { GameLogicService } from 'src/app/services/gameLogic.service';

@Component({
  selector: 'sapper-cell',
  templateUrl: './sapper-cell.component.html',
  styleUrls: ['./sapper-cell.component.sass'],
})
export class SapperCellComponent {
  @Input() cell: SchemeWithState;
  @Input() numberCell: number = 0;
  @Input() numberRow: number = 0;
  constructor(private gameService: GameLogicService) {
    this.cell = { value: 0, isHide: true, isSetFlag: false };
  }

  changeHide(): void {
    this.gameService.onCellClick(this.numberCell, this.numberRow);
  }

  setFlag(event: any): void {
    event.preventDefault();
    this.gameService.onSetFlag(this.numberCell, this.numberRow);
  }
}
