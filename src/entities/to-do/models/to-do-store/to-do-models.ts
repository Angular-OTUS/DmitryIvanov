import { TaskItems } from '@share/api';

export const toDoFeatureKey: 'toDo' = 'toDo' as const;

export interface ToDoState {
  taskItems: TaskItems;
  loaded: boolean;
  error?: string;
}

export const initialToDoState: ToDoState = {
  taskItems: [],
  loaded: false,
  error: undefined,
};
