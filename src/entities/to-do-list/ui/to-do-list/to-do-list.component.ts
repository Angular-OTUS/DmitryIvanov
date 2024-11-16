import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TaskItem, TaskItems, TaskItemStatus } from '@share/api';
import { ToDoListItemComponent } from '../to-do-list-item';

export type SelectedTaskId = string | undefined | null;

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [CommonModule, ToDoListItemComponent],
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent {
  @Input() public taskItems: TaskItems = [];
  @Input() public selectedTaskId: SelectedTaskId;
  @Output() public changeSelectedTaskId: EventEmitter<SelectedTaskId> = new EventEmitter<SelectedTaskId>();
  @Output() public changeTaskItem: EventEmitter<TaskItem> = new EventEmitter<TaskItem>();
  @Output() public deleteTaskItem: EventEmitter<string> = new EventEmitter<string>();

  public onSelect(taskId: string): void {
    this.changeSelectedTaskId.emit(taskId === this.selectedTaskId ? null : taskId);
  }

  public onChangeTaskStatus(oldTaskItem: TaskItem, newTaskStatus: TaskItemStatus): void {
    this.changeTaskItem.emit({ ...oldTaskItem, status: newTaskStatus });
  }

  public onChangeTaskText(oldTaskItem: TaskItem, newText: string): void {
    this.changeTaskItem.emit({ ...oldTaskItem, text: newText });
  }

  public onDeleteTaskItem(id: string): void {
    this.deleteTaskItem.emit(id);
  }
}
