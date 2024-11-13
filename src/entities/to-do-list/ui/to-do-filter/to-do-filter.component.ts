import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { TaskItemStatus } from '@share/api';
import { UiKitModule } from '@share/ui';

type TaskStatusFilter = TaskItemStatus[];

@Component({
  selector: 'app-to-do-filter',
  standalone: true,
  imports: [CommonModule, UiKitModule],
  templateUrl: './to-do-filter.component.html',
  styleUrls: ['./to-do-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoFilterComponent {
  @Input() public value: TaskStatusFilter = [];
  @Output() public valueChange: EventEmitter<TaskStatusFilter> = new EventEmitter<TaskStatusFilter>();

  public onChange(event: MatButtonToggleChange): void {
    this.valueChange.emit(event.value as TaskStatusFilter);
  }
}
