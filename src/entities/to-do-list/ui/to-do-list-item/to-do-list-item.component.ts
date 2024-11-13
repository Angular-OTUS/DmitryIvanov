import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TaskItem, TaskItemStatus } from '@share/api';
import { ButtonComponent, TooltipDirective, UiKitModule } from '@share/ui';
import { ToDoInlineEditComponent } from '../to-do-inline-edit';

@Component({
  selector: 'app-to-do-list-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent, UiKitModule, TooltipDirective, ToDoInlineEditComponent],
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss'],
})
export class ToDoListItemComponent {
  public inlineEdit: boolean = false;

  @Input() public taskItem?: TaskItem;
  @Output() public selectEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() public changeStatusEvent: EventEmitter<TaskItemStatus> = new EventEmitter<TaskItemStatus>();
  @Output() public changeTextEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  public isStatusCompleted(): boolean {
    return this.taskItem?.status === 'Completed';
  }

  public onSelect(): void {
    this.selectEvent.emit();
  }

  public onStatusChange(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.changeStatusEvent.emit(this.isStatusCompleted() ? 'InProgress' : 'Completed');
  }

  public onEditText(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.inlineEdit = true;
  }

  public onEditTextSave(newText: string): void {
    this.inlineEdit = false;
    this.changeTextEvent.emit(newText);
  }

  public onEditTextCancel(): void {
    this.inlineEdit = false;
  }

  public onDelete(): void {
    this.deleteEvent.emit();
  }
}
