import { BehaviorSubject, catchError, Observable, of, Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';

import { TaskItem, TaskItems, TaskItemsService } from '@share/api';
import { ToastData } from '@share/lib';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  private isFirstSubscribe: boolean = true;
  private nextId: string = '1';
  private taskItemsSubject: BehaviorSubject<TaskItems>;
  private errorsSubject: Subject<string>;
  private notifySubject: Subject<ToastData>;
  private loadedSubject: BehaviorSubject<boolean>;

  constructor(private readonly apiClient: TaskItemsService) {
    this.taskItemsSubject = new BehaviorSubject<TaskItems>([]);
    this.errorsSubject = new Subject<string>();
    this.notifySubject = new Subject<ToastData>();
    this.loadedSubject = new BehaviorSubject<boolean>(false);
  }

  public getTaskItems(): Observable<TaskItems> {
    if (this.isFirstSubscribe) {
      this.fetchTaskItems();
    }

    return this.taskItemsSubject.asObservable();
  }

  public getErrors(): Observable<string> {
    return this.errorsSubject.asObservable();
  }

  public getNotify(): Observable<ToastData> {
    return this.notifySubject.asObservable();
  }

  public getLoaded(): Observable<boolean> {
    return this.loadedSubject.asObservable();
  }

  public fetchTaskItems(): void {
    this.isFirstSubscribe = false;
    this.loadedSubject.next(false);
    this.apiClient
      .getTaskItems()
      .pipe(catchError(this.handleError<TaskItems>('Error loading task list.', [])))
      .subscribe((taskItems: TaskItems) => {
        this.nextId = String(Math.max(0, ...taskItems.map((item: TaskItem) => Number(item.id))) + 1);
        this.taskItemsSubject.next(taskItems);
        this.loadedSubject.next(true);
      });
  }

  private handleError<T>(errMsg: string, result?: T) {
    return (): Observable<T> => {
      this.errorsSubject.next(errMsg);
      return of(result as T);
    };
  }

  public addTaskItem(newTask: { text: string; description: string }): void {
    this.apiClient
      .addTaskItem({ ...newTask, id: this.nextId, status: 'InProgress' })
      .pipe(
        tap(() => this.notifySubject.next({ text: 'Task added', type: 'success' })),
        catchError(this.handleError('Error adding task.'))
      )
      .subscribe(() => this.fetchTaskItems());
  }

  public updateTaskItem(taskItem: TaskItem): void {
    this.apiClient
      .updateTaskItem(taskItem)
      .pipe(
        tap(() => this.notifySubject.next({ text: 'Task updated', type: 'success' })),
        catchError(this.handleError('Error updating task status.'))
      )
      .subscribe(() => this.fetchTaskItems());
  }

  public deleteTaskItem(id: string): void {
    this.apiClient
      .deleteTaskItem(id)
      .pipe(
        tap(() => this.notifySubject.next({ text: 'Task removed', type: 'warning' })),
        catchError(this.handleError('Error deleting task.'))
      )
      .subscribe(() => this.fetchTaskItems());
  }
}
