import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UiKitModule } from '@share/ui';
import { ChangeLanguageService } from '../lib';

@Component({
  selector: 'app-change-language',
  standalone: true,
  imports: [CommonModule, UiKitModule],
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeLanguageComponent {
  constructor(public readonly service: ChangeLanguageService) {}
}
