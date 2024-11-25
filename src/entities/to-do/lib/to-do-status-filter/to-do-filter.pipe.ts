import { Pipe, PipeTransform } from '@angular/core';

import { TaskItem, TaskItems, TaskItemStatus } from '@share/api';

@Pipe({
  name: 'toDoStatusFilter',
  standalone: true,
})
export class ToDoStatusFilterPipe implements PipeTransform {
  public transform(taskItems: TaskItems, statuses: TaskItemStatus[]): TaskItems {
    if (!taskItems || !statuses) {
      return taskItems;
    }

    return taskItems.filter((taskItem: TaskItem) => statuses.includes(taskItem.status));
  }
}
