import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectedTaskId, ToDoFacadeService } from '@entities/to-do';
import { NewTask } from '@features/to-do-create';
import { TaskItem, TaskItems, TaskItemStatus } from '@share/api';
import { RouteTokens } from '@share/lib';
import { SelectedTaskService } from '../../lib';

@Component({
  selector: 'app-backlog-page',
  templateUrl: './backlog-page.component.html',
  styleUrls: ['./backlog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogPageComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  public taskItems: TaskItems = [];
  public filter: TaskItemStatus[] = ['InProgress', 'Completed'];
  public selectedTaskId: SelectedTaskId;

  constructor(
    protected readonly toDoFacadeService: ToDoFacadeService,
    private readonly selectedTaskService: SelectedTaskService,
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public async goToTask(newSelectedTaskId: SelectedTaskId): Promise<boolean> {
    return newSelectedTaskId
      ? this.router.navigate([newSelectedTaskId], { relativeTo: this.route })
      : this.clearSelectedItem();
  }

  public onFilterChange(event: TaskItemStatus[]): void {
    this.filter = event;
  }

  public onAddTaskItem(newTask: NewTask): void {
    this.toDoFacadeService.addTaskItem(newTask);
  }

  public onChangeTaskItem(taskItem: TaskItem): void {
    this.toDoFacadeService.updateTaskItem(taskItem);
  }

  public async onDeleteTaskItem(id: string): Promise<void> {
    if (this.selectedTaskId === id) {
      await this.clearSelectedItem();
    }
    this.toDoFacadeService.deleteTaskItem(id);
  }

  private async clearSelectedItem(): Promise<boolean> {
    return this.router.navigateByUrl(RouteTokens.BACKLOG);
  }

  public ngOnInit(): void {
    this.selectedTaskService.selectedTaskId$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedTaskId: string | undefined) => {
        this.selectedTaskId = selectedTaskId;
        this.cdr.markForCheck();
      });

    this.toDoFacadeService.taskItems$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((taskItems: TaskItems) => {
      this.taskItems = taskItems;
      this.cdr.markForCheck();
    });

    this.toDoFacadeService.loadTasks();
  }
}
