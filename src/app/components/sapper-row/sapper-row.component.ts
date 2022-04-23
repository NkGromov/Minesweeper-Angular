import { Component, Input } from '@angular/core';

@Component({
  selector: 'sapper-row',
  templateUrl: './sapper-row.component.html',
  styleUrls: ['./sapper-row.component.sass'],
})
export class SapperRowComponent {
  @Input() row: Array<number> = [];
  constructor() {}
}
