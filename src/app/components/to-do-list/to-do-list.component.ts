import { Component, OnDestroy, OnInit } from '@angular/core';

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
export class ToDoListComponent implements OnInit, OnDestroy {
  public taskItems: TaskItems = [
    { id: 1, text: 'Bye a new gaming laptop' },
    { id: 2, text: 'Complete previous task' },
    { id: 3, text: 'Create some angular app' },
  ];
  public newTask = '';
  public isLoading = false;

  public isAddTaskBtnDisabled(): boolean {
    return this.newTask.trim().length === 0;
  }

  public delTask(id: number): void {
    this.taskItems = this.taskItems.filter(item => item.id !== id);
  }

  public addTask(): void {
    const id = 1 + Math.max(0, ...this.taskItems.map(item => item.id));
    const text = this.newTask;
    this.taskItems.push({ id, text });
    this.newTask = '';
  }

  private fakeTimerId?: ReturnType<typeof setTimeout>;

  public ngOnInit(): void {
    this.isLoading = true;
    this.fakeTimerId = setTimeout(() => {
      this.fakeTimerId = undefined;
      this.isLoading = false;
    }, 500);
  }

  public ngOnDestroy(): void {
    if (this.fakeTimerId) {
      clearTimeout(this.fakeTimerId);
    }
  }
}
