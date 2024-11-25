import { CdkDrag } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';

import { TaskItem, TaskItems, taskItemTrackBy } from '@share/api';
import { UiKitModule } from '@share/ui';
import { ToDoKanbanItemComponent } from '../to-do-kanban-item';

@Component({
  selector: 'app-to-do-kanban-column',
  standalone: true,
  imports: [CommonModule, UiKitModule, ToDoKanbanItemComponent, CdkDrag],
  templateUrl: './to-do-kanban-column.component.html',
  styleUrls: ['./to-do-kanban-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoKanbanColumnComponent {
  public readonly taskItemTrackBy: TrackByFunction<TaskItem> = taskItemTrackBy;

  @Input() public title: string = '';
  @Input() public columnTaskItems: TaskItems = [];
  @Output() public changeTaskItem: EventEmitter<TaskItem> = new EventEmitter<TaskItem>();
  @Output() public deleteTaskItem: EventEmitter<string> = new EventEmitter<string>();

  public onChangeTaskText(oldTaskItem: TaskItem, newText: string): void {
    this.changeTaskItem.emit({ ...oldTaskItem, text: newText });
  }

  public onDeleteTaskItem(id: string): void {
    this.deleteTaskItem.emit(id);
  }
}
