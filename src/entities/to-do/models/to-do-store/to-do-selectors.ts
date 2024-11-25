import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { TaskItem, TaskItems } from '@share/api';
import { toDoFeatureKey, ToDoState } from './to-do-models';

const selectToDoState: MemoizedSelector<object, ToDoState> = createFeatureSelector<ToDoState>(toDoFeatureKey);

export const selectTaskItems: MemoizedSelector<object, TaskItems> = createSelector(
  selectToDoState,
  (state: ToDoState) => state.taskItems
);

export const selectLoaded: MemoizedSelector<object, boolean> = createSelector(
  selectToDoState,
  (state: ToDoState) => state.loaded
);

export const selectError: MemoizedSelector<object, string | undefined> = createSelector(
  selectToDoState,
  (state: ToDoState) => state.error
);

export const selectNextId: MemoizedSelector<object, string> = createSelector(selectToDoState, (state: ToDoState) =>
  String(Math.max(0, ...state.taskItems.map((item: TaskItem) => Number(item.id))) + 1)
);
