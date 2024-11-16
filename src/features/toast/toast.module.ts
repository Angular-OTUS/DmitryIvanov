import { OverlayModule } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { UiKitModule } from '@share/ui';
import { defaultToastConfig, TOAST_CONFIG_TOKEN, ToastConfig } from './lib';
import { ToastComponent } from './ui';

@NgModule({
  imports: [OverlayModule, UiKitModule, NgClass],
  declarations: [ToastComponent],
})
export class ToastModule {
  public static forRoot(config: ToastConfig = defaultToastConfig): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        {
          provide: TOAST_CONFIG_TOKEN,
          useValue: { ...defaultToastConfig, ...config },
        },
      ],
    };
  }
}
