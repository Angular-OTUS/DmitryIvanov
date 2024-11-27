import { catchError, exhaustMap, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { TaskItem, TaskItems, TaskItemsService } from '@share/api';
import { errorToMsg } from '@share/lib';
import { ToDoNotificationsService } from '../../lib';
import { selectLoaded, selectNextId } from './to-do-selectors';
import { ToDoActions } from './to-do.actions';

@Injectable()
export class ToDoEffects {
  public readonly loadTaskItems$: Observable<ReturnType<typeof ToDoActions.fetchTasks>> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.loadTasks),
      concatLatestFrom(() => this.store.select(selectLoaded)),
      filter(([, loaded]: [ReturnType<typeof ToDoActions.loadTasks>, boolean]) => !loaded),
      switchMap(() => of(ToDoActions.fetchTasks()))
    );
  });

  public readonly fetchTaskItems$: Observable<
    ReturnType<typeof ToDoActions.fetchTasksSuccess | typeof ToDoActions.fetchTasksFailure>
  > = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.fetchTasks),
      switchMap(() => {
        return this.apiClient.getTaskItems().pipe(
          map((taskItems: TaskItems) => ToDoActions.fetchTasksSuccess({ taskItems })),
          catchError((error: unknown) => of(ToDoActions.fetchTasksFailure({ error })))
        );
      })
    );
  });

  public readonly addTask$: Observable<
    ReturnType<typeof ToDoActions.addTaskSuccess | typeof ToDoActions.addTaskFailure>
  > = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.addTask),
      concatLatestFrom(() => this.store.select(selectNextId)),
      exhaustMap(([action, nextId]: [ReturnType<typeof ToDoActions.addTask>, string]) => {
        return this.apiClient
          .addTaskItem({
            id: nextId,
            text: action.text,
            description: action.description,
            status: 'InProgress',
          })
          .pipe(
            map(() => ToDoActions.addTaskSuccess()),
            catchError((error: unknown) => of(ToDoActions.addTaskFailure({ error })))
          );
      })
    );
  });

  public readonly addTaskSuccess$: Observable<ReturnType<typeof ToDoActions.fetchTasks>> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.addTaskSuccess),
      tap(() => this.notificationsService.notifyAddTask()),
      switchMap(() => of(ToDoActions.fetchTasks()))
    );
  });

  public readonly updateTask$: Observable<
    ReturnType<typeof ToDoActions.updateTaskSuccess | typeof ToDoActions.updateTaskFailure>
  > = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.updateTask),
      exhaustMap(({ taskItem }: { taskItem: TaskItem }) => {
        return this.apiClient.updateTaskItem(taskItem).pipe(
          map(() => ToDoActions.updateTaskSuccess()),
          catchError((error: unknown) => of(ToDoActions.updateTaskFailure({ error })))
        );
      })
    );
  });

  public readonly updateTaskSuccess$: Observable<ReturnType<typeof ToDoActions.fetchTasks>> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.updateTaskSuccess),
      tap(() => this.notificationsService.notifyUpdateTask()),
      switchMap(() => of(ToDoActions.fetchTasks()))
    );
  });

  public readonly deleteTask$: Observable<
    ReturnType<typeof ToDoActions.deleteTaskSuccess | typeof ToDoActions.deleteTaskFailure>
  > = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.deleteTask),
      exhaustMap(({ id }: { id: string }) => {
        return this.apiClient.deleteTaskItem(id).pipe(
          map(() => ToDoActions.deleteTaskSuccess()),
          catchError((error: unknown) => of(ToDoActions.deleteTaskFailure({ error })))
        );
      })
    );
  });

  public readonly deleteTaskSuccess$: Observable<ReturnType<typeof ToDoActions.fetchTasks>> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToDoActions.deleteTaskSuccess),
      tap(() => this.notificationsService.notifyDeleteTask()),
      switchMap(() => of(ToDoActions.fetchTasks()))
    );
  });

  public readonly processTasksFailure$: Observable<unknown> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ToDoActions.fetchTasksFailure,
          ToDoActions.addTaskFailure,
          ToDoActions.updateTaskFailure,
          ToDoActions.deleteTaskFailure
        ),
        tap(({ error }: { error: unknown }) => this.notificationsService.notifyFailure(errorToMsg(error)))
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly apiClient: TaskItemsService,
    private readonly notificationsService: ToDoNotificationsService
  ) {}
}
