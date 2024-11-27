import { ActionReducer, createReducer, on } from '@ngrx/store';

import { TaskItems } from '@share/api';
import { errorToMsg } from '@share/lib';
import { initialToDoState, ToDoState } from './to-do-models';
import { ToDoActions } from './to-do.actions';

export const toToReducer: ActionReducer<ToDoState> = createReducer<ToDoState>(
  initialToDoState,
  on(ToDoActions.fetchTasks, (state: ToDoState): ToDoState => ({ ...state, loaded: false })),
  on(
    ToDoActions.fetchTasksSuccess,
    (state: ToDoState, { taskItems }: { taskItems: TaskItems }): ToDoState => ({
      ...state,
      loaded: true,
      taskItems,
      error: undefined,
    })
  ),
  on(
    ToDoActions.fetchTasksFailure,
    (state: ToDoState, { error }: { error: unknown }): ToDoState => ({
      ...state,
      loaded: false,
      error: errorToMsg(error),
    })
  ),
  on(
    ToDoActions.addTaskFailure,
    (state: ToDoState, { error }: { error: unknown }): ToDoState => ({
      ...state,
      error: errorToMsg(error),
    })
  ),
  on(
    ToDoActions.updateTaskFailure,
    (state: ToDoState, { error }: { error: unknown }): ToDoState => ({
      ...state,
      error: errorToMsg(error),
    })
  ),
  on(
    ToDoActions.deleteTaskFailure,
    (state: ToDoState, { error }: { error: unknown }): ToDoState => ({
      ...state,
      error: errorToMsg(error),
    })
  )
);
