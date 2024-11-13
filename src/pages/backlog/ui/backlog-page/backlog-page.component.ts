import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { SelectedTaskId, ToDoListService } from '@entities/to-do-list';
import { NewTask } from '@features/to-do-create';
import { ToastData, ToastService } from '@features/toast';
import { TaskItem, TaskItems, TaskItemStatus } from '@share/api';
import { RouteParams, RouteTokens } from '@share/lib';

@Component({
  selector: 'app-backlog-page',
  templateUrl: './backlog-page.component.html',
  styleUrls: ['./backlog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private changedSelectedTaskId?: Subscription;

  public taskItems: TaskItems = [];
  public loaded$: Observable<boolean>;
  public filter: TaskItemStatus[] = ['InProgress', 'Completed'];
  public selectedTaskId: SelectedTaskId = null;

  constructor(
    private readonly toDoListService: ToDoListService,
    private readonly toastService: ToastService,
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private router: Router
  ) {
    this.loaded$ = this.toDoListService.getLoaded();
  }

  public async goToTask(newSelectedTaskId: SelectedTaskId): Promise<boolean> {
    if (newSelectedTaskId === null) {
      return this.clearSelectedItem();
    }

    const ready: boolean = await this.router.navigate([newSelectedTaskId], { relativeTo: this.route });

    if (ready) {
      this.subscribeToChangeSelectedItem();
    }

    return ready;
  }

  public onFilterChange(event: TaskItemStatus[]): void {
    this.filter = event;
  }

  public filteredTaskItems(): TaskItems {
    return this.taskItems.filter((item: TaskItem) => this.filter.includes(item.status));
  }

  public onAddTaskItem(newTask: NewTask): void {
    this.toDoListService.addTaskItem({ ...newTask, id: this.getNextId(), status: 'InProgress' });
  }

  public onChangeTaskItem(taskItem: TaskItem): void {
    this.toDoListService.updateTaskItem(taskItem);
  }

  public onDeleteTaskItem(id: string): void {
    this.toDoListService.deleteTaskItem(id);
  }

  private async clearSelectedItem(): Promise<boolean> {
    const ready: boolean = await this.router.navigateByUrl(RouteTokens.Backlog);

    if (ready) {
      this.unSubscribeToChangedSelectedTaskId();
      this.selectedTaskId = null;
    }

    return ready;
  }

  private unSubscribeToChangedSelectedTaskId(): void {
    if (this.changedSelectedTaskId) {
      this.changedSelectedTaskId.unsubscribe();
      this.changedSelectedTaskId = undefined;
      this.cdr.markForCheck();
    }
  }

  private subscribeToChangeSelectedItem(): void {
    if (this.route.firstChild && !this.changedSelectedTaskId) {
      this.changedSelectedTaskId = this.route.firstChild.paramMap
        .pipe(takeUntil(this.destroy$))
        .subscribe((paramMap: ParamMap) => {
          this.selectedTaskId = paramMap.get(RouteParams.TaskId);
          this.cdr.markForCheck();
        });
    }
  }

  private getNextId(): string {
    return String(Math.max(0, ...this.taskItems.map((item: TaskItem) => Number(item.id))) + 1);
  }

  public ngOnInit(): void {
    this.toDoListService
      .getTaskItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((taskItems: TaskItems) => {
        this.taskItems = taskItems;
        this.cdr.markForCheck();
      });

    this.toDoListService
      .getErrors()
      .pipe(takeUntil(this.destroy$))
      .subscribe((errorMsg: string) => this.toastService.showToast({ text: errorMsg, type: 'warning' }));

    this.toDoListService
      .getNotify()
      .pipe(takeUntil(this.destroy$))
      .subscribe((notify: ToastData) => this.toastService.showToast(notify));

    this.subscribeToChangeSelectedItem();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
