import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskItems, ToDoListService } from '../../services/to-do-list';
import { ToastService } from '../../Shared/components/toast';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit, OnDestroy {
  constructor(
    private toDoListService: ToDoListService,
    private toastService: ToastService
  ) {}

  public taskItems: TaskItems = [];
  public newTask = '';
  public newDescription = '';
  public isLoading = false;
  public selectedItemId: number | null = null;
  public inlineEditItemId: number | null = null;

  public isAddTaskBtnDisabled(): boolean {
    return this.newTask.trim().length === 0;
  }

  public delTask(id: number): void {
    if (this.selectedItemId === id) {
      this.selectedItemId = null;
    }

    this.toDoListService.delTask(id);
    this.taskItems = this.toDoListService.getTaskItems();
    this.toastService.showToast({ text: 'Task removed', type: 'warning' });
  }

  public addTask(): void {
    this.toDoListService.addTask({ text: this.newTask, description: this.newDescription });
    this.taskItems = this.toDoListService.getTaskItems();
    this.toastService.showToast({ text: 'Task added', type: 'success' });

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

  public inlineEditEnter(id: number): void {
    this.inlineEditItemId = id;
  }

  public inlineEditorSave(id: number, taskText: string): void {
    if (this.inlineEditItemId === id) {
      this.toDoListService.updateTaskText(id, taskText);
      this.inlineEditItemId = null;
      this.taskItems = this.toDoListService.getTaskItems();
      this.toastService.showToast({ text: 'The task has been changed', type: 'info' });
    }
  }

  public inlineEditorCancel(id: number): void {
    if (this.inlineEditItemId === id) {
      this.inlineEditItemId = null;
    }
  }

  private fakeTimerId?: ReturnType<typeof setTimeout>;

  public ngOnInit(): void {
    this.isLoading = true;
    this.fakeTimerId = setTimeout(() => {
      this.fakeTimerId = undefined;
      this.taskItems = this.toDoListService.getTaskItems();
      this.isLoading = false;
    }, 500);
  }

  public ngOnDestroy(): void {
    if (this.fakeTimerId) {
      clearTimeout(this.fakeTimerId);
    }
  }
}
