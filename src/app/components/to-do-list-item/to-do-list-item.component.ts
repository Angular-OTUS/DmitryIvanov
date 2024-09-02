import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss'],
})
export class ToDoListItemComponent {
  @Input({ required: true }) text!: string;
  @Output() deleteEvent = new EventEmitter();

  onDelete(): void {
    this.deleteEvent.emit();
  }
}
