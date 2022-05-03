import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { bombNumber } from 'src/app/config/game';
import { CellWithState, Coords } from 'src/app/game/models/game';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.sass'],
})
export class CellComponent implements DoCheck {
  @Input() isOver = false;
  @Input() isWin = false;
  @Input() cell = {} as CellWithState;
  @Output() onCellClick = new EventEmitter<Coords>();
  @Output() setFlag = new EventEmitter<Coords>();
  @Output() changeOpenCell = new EventEmitter<Coords>();
  @Output() onPressNearbyCells = new EventEmitter<Coords>();
  readonly bombNumber = bombNumber;
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
    if (this.isOver && !this.isWin && this.cell.value === this.bombNumber)
      this.changeOpenCell.emit(this.cell.coords);
    if (
      this.isOver &&
      this.isWin &&
      this.cell.value === this.bombNumber &&
      !this.cell.isFlag
    )
      this.setFlag.emit(this.cell.coords);
  }
}
