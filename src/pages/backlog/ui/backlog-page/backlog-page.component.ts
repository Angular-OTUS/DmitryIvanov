import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { SelectedTaskId, ToDoListService } from '@entities/to-do-list';
import { NewTask } from '@features/to-do-create';
import { TaskItem, TaskItems, TaskItemStatus } from '@share/api';
import { RouteParams, RouteTokens } from '@share/lib';

@Component({
  selector: 'app-backlog-page',
  templateUrl: './backlog-page.component.html',
  styleUrls: ['./backlog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogPageComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  private changedSelectedTaskId?: Subscription;

  public taskItems: TaskItems = [];
  public readonly loaded$: Observable<boolean> = this.toDoListService.getLoaded();
  public filter: TaskItemStatus[] = ['InProgress', 'Completed'];
  public selectedTaskId: SelectedTaskId;

  constructor(
    private readonly toDoListService: ToDoListService,
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

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

  public onAddTaskItem(newTask: NewTask): void {
    this.toDoListService.addTaskItem(newTask);
  }

  public onChangeTaskItem(taskItem: TaskItem): void {
    this.toDoListService.updateTaskItem(taskItem);
  }

  public async onDeleteTaskItem(id: string): Promise<void> {
    if (this.selectedTaskId === id) {
      await this.clearSelectedItem();
    }
    this.toDoListService.deleteTaskItem(id);
  }

  private async clearSelectedItem(): Promise<boolean> {
    const ready: boolean = await this.router.navigateByUrl(RouteTokens.BACKLOG);

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
          this.selectedTaskId = paramMap.get(RouteParams.TASK_ID);
          this.cdr.markForCheck();
        });
    }
  }

  public ngOnInit(): void {
    this.toDoListService
      .getTaskItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((taskItems: TaskItems) => {
        this.taskItems = taskItems;
        this.cdr.markForCheck();
      });

    this.subscribeToChangeSelectedItem();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
