import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TaskItem, TaskItems, TaskItemStatus } from '@share/api';
import { ToDoStatusFilterPipe } from '../../lib';
import { ToDoKanbanColumnComponent } from '../to-do-kanban-column';

@Component({
  selector: 'app-to-do-kanban',
  standalone: true,
  imports: [CommonModule, ToDoKanbanColumnComponent, ToDoStatusFilterPipe, CdkDropList],
  templateUrl: './to-do-kanban.component.html',
  styleUrls: ['./to-do-kanban.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoKanbanComponent {
  @Input() public taskItems: TaskItems = [];
  @Output() public changeTaskItem: EventEmitter<TaskItem> = new EventEmitter<TaskItem>();
  @Output() public deleteTaskItem: EventEmitter<string> = new EventEmitter<string>();

  public onChangeTaskItem(changedTaskItem: TaskItem): void {
    this.changeTaskItem.emit(changedTaskItem);
  }

  public onDeleteTaskItem(id: string): void {
    this.deleteTaskItem.emit(id);
  }

  public drop(event: CdkDragDrop<string>): void {
    if (event.container !== event.previousContainer) {
      this.changeTaskItem.emit({ ...(event.item.data as TaskItem), status: event.container.data as TaskItemStatus });
    }
  }
}
