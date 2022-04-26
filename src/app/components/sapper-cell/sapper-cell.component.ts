import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sapper-cell',
  templateUrl: './sapper-cell.component.html',
  styleUrls: ['./sapper-cell.component.sass'],
})
export class SapperCellComponent implements DoCheck {
  @Input() numberCell = 0;
  @Input() numberRow = 0;
  @Input() nearlyIsOpen = false;
  @Input() isOver = false;
  @Input() isWin = false;
  @Input() value = 0;
  @Output() endGame = new EventEmitter<boolean>();
  @Output() decrementCountOfCell = new EventEmitter();
  isHidden = true;
  isFlag = false;

  constructor() {}

  changeHiddenCell() {
    if (!this.isHidden || this.isFlag) return;
    this.isHidden = false;
    this.decrementCountOfCell.emit();
  }

  onCellClick(value: number): void {
    this.changeHiddenCell();
    if (value === 100) this.endGame.emit(false);
  }

  setFlag(event: any): void {
    event.preventDefault();
    if (this.isHidden) this.isFlag = !this.isFlag;
  }

  ngDoCheck(): void {
    if (this.isOver && !this.isWin && this.value === 100)
      this.changeHiddenCell();
  }
}
