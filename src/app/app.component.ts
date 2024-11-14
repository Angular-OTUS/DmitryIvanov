import { Subject, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { ToDoListService } from '@entities/to-do-list';
import { ToastService } from '@features/toast';
import { ToastData } from '@share/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly toDoListService: ToDoListService,
    private readonly toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.toDoListService
      .getErrors()
      .pipe(takeUntil(this.destroy$))
      .subscribe((errorMsg: string) => this.toastService.showToast({ text: errorMsg, type: 'warning' }));

    this.toDoListService
      .getNotify()
      .pipe(takeUntil(this.destroy$))
      .subscribe((notify: ToastData) => this.toastService.showToast(notify));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
