import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TaskItem } from '@share/api';
import { ButtonComponent, TooltipDirective, UiKitModule } from '@share/ui';
import { ToDoInlineEditComponent } from '../to-do-inline-edit';

@Component({
  selector: 'app-to-do-kanban-item',
  standalone: true,
  imports: [CommonModule, UiKitModule, ToDoInlineEditComponent, ButtonComponent, TooltipDirective],
  templateUrl: './to-do-kanban-item.component.html',
  styleUrls: ['./to-do-kanban-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoKanbanItemComponent {
  public inlineEdit: boolean = false;

  @Input() public taskItem?: TaskItem;
  @Output() public changeTextEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  public onEditText(): void {
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
