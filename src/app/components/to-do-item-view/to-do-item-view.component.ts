import { Subject, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouteParams } from '../../app-routing.module';
import { TaskItem, TaskItems, ToDoListService } from '../../services';

@Component({
  selector: 'app-to-do-item-view',
  templateUrl: './to-do-item-view.component.html',
  styleUrls: ['./to-do-item-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private taskId: string | null = null;
  private taskItems: TaskItems = [];

  constructor(
    private toDoListService: ToDoListService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  public getDescription(): string {
    const taskItem: TaskItem | undefined = this.taskItems.find((item: TaskItem) => item.id === this.taskId);
    return taskItem ? taskItem.description : '';
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
