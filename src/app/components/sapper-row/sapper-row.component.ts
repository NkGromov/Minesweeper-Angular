import { Component, Input } from '@angular/core';
import { SchemeWithState } from 'src/app/models/game';

@Component({
  selector: 'sapper-row',
  templateUrl: './sapper-row.component.html',
  styleUrls: ['./sapper-row.component.sass'],
})
export class SapperRowComponent {
  @Input() row: Array<SchemeWithState> = [];
  @Input() numberRow: number = 0;
  constructor() {}
}
