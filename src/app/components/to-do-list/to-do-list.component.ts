import { Component } from '@angular/core';

type TaskItem = {
  id: number;
  text: string;
};
type TaskItems = TaskItem[];

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent {
  taskItems: TaskItems = [
    { id: 1, text: 'Bye a new gaming laptop' },
    { id: 2, text: 'Complete previous task' },
    { id: 3, text: 'Create some angular app' },
  ];
  newTask = '';

  isAddTaskBtnDisabled(): boolean {
    return this.newTask.trim().length === 0;
  }

  delTask(id: number): void {
    this.taskItems = this.taskItems.filter(item => item.id !== id);
  }

  addTask(): void {
    const id = 1 + Math.max(0, ...this.taskItems.map(item => item.id));
    const text = this.newTask;
    this.taskItems.push({ id, text });
  }
}
