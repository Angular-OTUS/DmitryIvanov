import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SelectedTaskId, ToDoFacadeService } from '@entities/to-do';
import { TaskItem, TaskItems } from '@share/api';
import { SpinnerComponent } from '@share/ui';
import { SelectedTaskService } from '../../lib';

@Component({
  selector: 'app-to-do-desc-view',
  templateUrl: './to-do-desc-view.component.html',
  styleUrls: ['./to-do-desc-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, NgIf, SpinnerComponent],
})
export class ToDoDescViewComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private taskId: SelectedTaskId;
  private taskItems: TaskItems = [];

  public getDescription(): string {
    const taskItem: TaskItem | undefined = this.taskItems.find((item: TaskItem) => item.id === this.taskId);
    return taskItem ? taskItem.description : '';
  }

  constructor(
    protected readonly toDoFacadeService: ToDoFacadeService,
    private readonly selectedTaskService: SelectedTaskService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.selectedTaskService.selectedTaskId$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedTaskId: string | undefined) => {
        this.taskId = selectedTaskId;
        this.cdr.markForCheck();
      });

    this.toDoFacadeService.taskItems$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((taskItems: TaskItems) => {
      this.taskItems = taskItems;
      this.cdr.markForCheck();
    });

    this.toDoFacadeService.loadTasks();
  }
}
