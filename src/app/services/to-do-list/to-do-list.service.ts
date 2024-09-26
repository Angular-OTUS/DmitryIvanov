import { Injectable } from '@angular/core';
import { TaskItems } from './to-do-list.types';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  private items: TaskItems = [
    { id: 1, text: 'Bye a new gaming laptop', description: 'Description for the task Bye a new gaming laptop' },
    { id: 2, text: 'Complete previous task', description: 'Description for the task Complete previous task' },
    { id: 3, text: 'Create some angular app', description: 'Description for the task Create some angular app' },
  ];

  public getTaskItems() {
    return this.items;
  }

  public addTask(newTask: { text: string; description: string }): number {
    const id = 1 + Math.max(0, ...this.items.map(item => item.id));
    const { text, description } = newTask;
    this.items.push({ id, text, description });
    return id;
  }

  public delTask(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  public updateTaskText(id: number, text: string): void {
    this.items = this.items.map(item => ({ ...item, text: item.id === id ? text : item.text }));
  }
}
