import { Injectable } from '@angular/core';
import { TaskItems, TaskItemStatus } from './to-do-list.types';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  private items: TaskItems = [
    {
      id: 1,
      text: 'Bye a new gaming laptop',
      description: 'Description for the task Bye a new gaming laptop',
      status: 'InProgress',
    },
    {
      id: 2,
      text: 'Complete previous task',
      description: 'Description for the task Complete previous task',
      status: 'Completed',
    },
    {
      id: 3,
      text: 'Create some angular app',
      description: 'Description for the task Create some angular app',
      status: 'InProgress',
    },
  ];

  public getTaskItems() {
    return [...this.items];
  }

  public addTask(newTask: { text: string; description: string }): number {
    const id = 1 + Math.max(0, ...this.items.map(item => item.id));
    this.items.push({ ...newTask, id, status: 'InProgress' });
    return id;
  }

  public delTask(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  private getTaskIdxById(id: number): number {
    return this.items.findIndex(item => item.id === id);
  }

  public updateTaskText(id: number, text: string): void {
    const idx = this.getTaskIdxById(id);
    if (~idx) {
      this.items[idx] = { ...this.items[idx], text };
    }
  }

  public updateTaskStatus(id: number, status: TaskItemStatus): void {
    const idx = this.getTaskIdxById(id);
    if (~idx) {
      this.items[idx] = { ...this.items[idx], status };
    }
  }
}
