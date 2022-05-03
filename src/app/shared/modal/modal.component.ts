import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';

  constructor() {}

  close(): void {
    this.isOpen = false;
  }
}
