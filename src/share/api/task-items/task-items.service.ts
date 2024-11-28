import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments';
import { TaskItem, TaskItems } from './models';

@Injectable({
  providedIn: 'root',
})
export class TaskItemsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getTaskItems(): Observable<TaskItems> {
    return this.http.get<TaskItems>(this.apiUrl);
  }

  public addTaskItem(taskItem: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, taskItem);
  }

  public updateTaskItem(taskItem: TaskItem): Observable<TaskItem> {
    return this.http.put<TaskItem>(`${this.apiUrl}/${taskItem.id}`, taskItem);
  }

  public deleteTaskItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
