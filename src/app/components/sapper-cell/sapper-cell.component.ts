import { Component, Input } from '@angular/core';

@Component({
  selector: 'sapper-cell',
  templateUrl: './sapper-cell.component.html',
  styleUrls: ['./sapper-cell.component.sass'],
})
export class SapperCellComponent {
  @Input() cell: number = 0;
  public isHide: boolean = true;
  constructor() {}

  changeHide(): void {
    this.isHide = !this.isHide;
  }
}
