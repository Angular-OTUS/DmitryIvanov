import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { ToastData } from '@share/lib';

declare const $localize: (messageParts: TemplateStringsArray, ...expressions: unknown[]) => string;

@Injectable({
  providedIn: 'root',
})
export class ToDoNotificationsService {
  private readonly successSubject: Subject<ToastData> = new Subject<ToastData>();
  private readonly failureSubject: Subject<string> = new Subject<string>();

  public get successNotifications$(): Observable<ToastData> {
    return this.successSubject.asObservable();
  }

  public get failureNotifications$(): Observable<string> {
    return this.failureSubject.asObservable();
  }

  public notifyAddTask(): void {
    this.successSubject.next({ text: $localize`Task added`, type: 'success' });
  }

  public notifyUpdateTask(): void {
    this.successSubject.next({ text: $localize`Task updated`, type: 'success' });
  }

  public notifyDeleteTask(): void {
    this.successSubject.next({ text: $localize`Task removed`, type: 'warning' });
  }

  public notifyFailure(msg: string): void {
    this.failureSubject.next(msg);
  }
}
