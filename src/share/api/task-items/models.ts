import { TrackByFunction } from '@angular/core';

export type TaskItemStatus = 'InProgress' | 'Completed';

export type TaskItem = {
  id: string;
  text: string;
  description: string;
  status: TaskItemStatus;
};

export type TaskItems = TaskItem[];

export const taskItemTrackBy: TrackByFunction<TaskItem> = (index: number, taskItem: TaskItem) => taskItem.id;
