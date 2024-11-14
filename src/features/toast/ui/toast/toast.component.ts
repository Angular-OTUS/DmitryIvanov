import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { ToastData } from '@share/lib';
import { TOAST_CONFIG_TOKEN, TOAST_DATA, TOAST_REF, ToastConfig, ToastRef } from '../../lib';
import { ToastAnimationEvent, toastAnimations, ToastAnimationState } from '../toast-animation';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [toastAnimations.fadeToast],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit, OnDestroy {
  private intervalId?: ReturnType<typeof setTimeout>;
  public animationState: ToastAnimationState = 'default';
  public iconType: string;

  constructor(
    @Inject(TOAST_DATA) public readonly data: ToastData,
    @Inject(TOAST_REF) public readonly ref: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) public readonly toastConfig: ToastConfig
  ) {
    this.iconType = data.type === 'success' ? 'done' : data.type;
  }

  public close(): void {
    this.ref.close();
  }

  public onFadeFinished(event: AnimationEvent): void {
    const { toState }: ToastAnimationEvent = event as ToastAnimationEvent;
    const isFadeOut: boolean = toState === 'closing';
    const itFinished: boolean = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }

  public ngOnInit(): void {
    this.intervalId = setTimeout(() => this.close(), 5000);
  }

  public ngOnDestroy(): void {
    clearTimeout(this.intervalId);
  }
}
