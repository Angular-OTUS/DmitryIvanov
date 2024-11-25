import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ToDoNotificationsService } from '@entities/to-do';
import { ToastService } from '@features/toast';
import { ToastData } from '@share/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly toDoNotifications: ToDoNotificationsService,
    private readonly toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.toDoNotifications.successNotifications$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((toastData: ToastData) => this.toastService.showToast(toastData));

    this.toDoNotifications.failureNotifications$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((text: string) =>
      this.toastService.showToast({
        text,
        type: 'warning',
      })
    );
  }
}
