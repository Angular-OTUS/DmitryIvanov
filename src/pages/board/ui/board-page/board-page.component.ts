import { Observable, Subject, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { ToDoListService } from '@entities/to-do-list';
import { NewTask } from '@features/to-do-create';
import { TaskItem, TaskItems } from '@share/api';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  public taskItems: TaskItems = [];
  public readonly loaded$: Observable<boolean> = this.toDoListService.getLoaded();

  constructor(
    private readonly toDoListService: ToDoListService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public onAddTaskItem(newTask: NewTask): void {
    this.toDoListService.addTaskItem(newTask);
  }

  public onChangeTaskItem(taskItem: TaskItem): void {
    this.toDoListService.updateTaskItem(taskItem);
  }

  public onDeleteTaskItem(id: string): void {
    this.toDoListService.deleteTaskItem(id);
  }

  public ngOnInit(): void {
    this.toDoListService
      .getTaskItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((taskItems: TaskItems) => {
        this.taskItems = taskItems;
        this.cdr.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
