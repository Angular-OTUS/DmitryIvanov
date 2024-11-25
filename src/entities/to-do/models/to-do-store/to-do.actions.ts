import { ActionCreator, createActionGroup, emptyProps, props } from '@ngrx/store';

import { TaskItem, TaskItems } from '@share/api';

type ActionWithProps<T> = ActionCreator<string, (props: T) => T & { type: string }>;
type ActionWithoutProps = ActionCreator<string, () => { type: string }>;

export const ToDoActions: {
  loadTasks: ActionWithoutProps;
  fetchTasks: ActionWithoutProps;
  fetchTasksSuccess: ActionWithProps<{ taskItems: TaskItems }>;
  fetchTasksFailure: ActionWithProps<{ error: unknown }>;
  addTask: ActionWithProps<{ text: string; description: string }>;
  addTaskSuccess: ActionWithoutProps;
  addTaskFailure: ActionWithProps<{ error: unknown }>;
  updateTask: ActionWithProps<{ taskItem: TaskItem }>;
  updateTaskSuccess: ActionWithoutProps;
  updateTaskFailure: ActionWithProps<{ error: unknown }>;
  deleteTask: ActionWithProps<{ id: string }>;
  deleteTaskSuccess: ActionWithoutProps;
  deleteTaskFailure: ActionWithProps<{ error: unknown }>;
} = createActionGroup({
  source: 'ToDo',
  events: {
    loadTasks: emptyProps(),
    fetchTasks: emptyProps(),
    fetchTasksSuccess: props<{ taskItems: TaskItems }>(),
    fetchTasksFailure: props<{ error: unknown }>(),
    addTask: props<{ text: string; description: string }>(),
    addTaskSuccess: emptyProps(),
    addTaskFailure: props<{ error: unknown }>(),
    updateTask: props<{ taskItem: TaskItem }>(),
    updateTaskSuccess: emptyProps(),
    updateTaskFailure: props<{ error: unknown }>(),
    deleteTask: props<{ id: string }>(),
    deleteTaskSuccess: emptyProps(),
    deleteTaskFailure: props<{ error: unknown }>(),
  },
});
