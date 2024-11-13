import { Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { SelectedTaskId, ToDoListService } from '@entities/to-do-list';
import { TaskItem, TaskItems } from '@share/api';
import { RouteParams } from '@share/lib';
import { SpinnerComponent } from '@share/ui';

@Component({
  selector: 'app-to-do-desc-view',
  templateUrl: './to-do-desc-view.component.html',
  styleUrls: ['./to-do-desc-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, NgIf, SpinnerComponent],
})
export class ToDoDescViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private taskId: SelectedTaskId = null;
  private taskItems: TaskItems = [];
  public loaded$: Observable<boolean>;

  public getDescription(): string {
    const taskItem: TaskItem | undefined = this.taskItems.find((item: TaskItem) => item.id === this.taskId);
    return taskItem ? taskItem.description : '';
  }

  constructor(
    private toDoListService: ToDoListService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.loaded$ = this.toDoListService.getLoaded();
  }

  public ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((paramMap: ParamMap) => {
      this.taskId = paramMap.get(RouteParams.TaskId);
      this.cdr.markForCheck();
    });

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
