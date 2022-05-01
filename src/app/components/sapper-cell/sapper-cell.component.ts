import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { CellWithState, Coords } from 'src/app/models/game';

@Component({
  selector: 'sapper-cell',
  templateUrl: './sapper-cell.component.html',
  styleUrls: ['./sapper-cell.component.sass'],
})
export class SapperCellComponent implements DoCheck {
  @Input() isOver = false;
  @Input() isWin = false;
  @Input() cell = {} as CellWithState;
  @Output() onCellClick = new EventEmitter<Coords>();
  @Output() setFlag = new EventEmitter<Coords>();
  @Output() changeOpenCell = new EventEmitter<Coords>();
  @Output() onPressNearbyCells = new EventEmitter<Coords>();

  constructor() {}

  onMouseUp(event: MouseEvent): void {
    event.preventDefault();
    if (event.button !== 0) return;
    this.onCellClick.emit(this.cell.coords);
  }

  onPressNearby(event: MouseEvent): void {
    event.preventDefault();
    if (event.button !== 0) return;
    this.onPressNearbyCells.emit(this.cell.coords);
  }

  rightClick(event: MouseEvent): void {
    event.preventDefault();
    this.setFlag.emit(this.cell.coords);
  }

  ngDoCheck(): void {
    if (this.isOver && !this.isWin && this.cell.value === 100)
      this.changeOpenCell.emit(this.cell.coords);
  }
}
