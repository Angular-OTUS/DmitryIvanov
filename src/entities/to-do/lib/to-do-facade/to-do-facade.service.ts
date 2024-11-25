import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { TaskItem, TaskItems } from '@share/api';
import { selectLoaded, selectTaskItems, ToDoActions } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ToDoFacadeService {
  constructor(private readonly store: Store) {}

  public get taskItems$(): Observable<TaskItems> {
    return this.store.select(selectTaskItems);
  }

  public get loaded$(): Observable<boolean> {
    return this.store.select(selectLoaded);
  }

  public loadTasks(): void {
    this.store.dispatch(ToDoActions.loadTasks());
  }

  public addTaskItem(newTask: { text: string; description: string }): void {
    this.store.dispatch(ToDoActions.addTask(newTask));
  }

  public updateTaskItem(taskItem: TaskItem): void {
    this.store.dispatch(ToDoActions.updateTask({ taskItem }));
  }

  public deleteTaskItem(id: string): void {
    this.store.dispatch(ToDoActions.deleteTask({ id }));
  }
}
