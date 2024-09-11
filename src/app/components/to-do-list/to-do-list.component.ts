import { Component, OnDestroy, OnInit } from '@angular/core';

type TaskItem = {
  id: number;
  text: string;
  description: string;
};
type TaskItems = TaskItem[];

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit, OnDestroy {
  public taskItems: TaskItems = [
    { id: 1, text: 'Bye a new gaming laptop', description: 'Description for the task Bye a new gaming laptop' },
    { id: 2, text: 'Complete previous task', description: 'Description for the task Complete previous task' },
    { id: 3, text: 'Create some angular app', description: 'Description for the task Create some angular app' },
  ];
  public newTask = '';
  public newDescription = '';
  public isLoading = false;
  public selectedItemId: number | null = null;

  public isAddTaskBtnDisabled(): boolean {
    return this.newTask.trim().length === 0;
  }

  public delTask(id: number): void {
    if (this.selectedItemId === id) {
      this.selectedItemId = null;
    }
    this.taskItems = this.taskItems.filter(item => item.id !== id);
  }

  public addTask(): void {
    const id = 1 + Math.max(0, ...this.taskItems.map(item => item.id));
    const text = this.newTask;
    const description = this.newDescription;
    this.taskItems.push({ id, text, description });

    this.newTask = '';
    this.newDescription = '';
  }

  public selectTask(id: number): void {
    this.selectedItemId = this.selectedItemId === id ? null : id;
  }
  public selectedDescription(): string {
    const selectedItem = this.taskItems.find(item => item.id === this.selectedItemId);
    return selectedItem ? selectedItem.description : '';
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
