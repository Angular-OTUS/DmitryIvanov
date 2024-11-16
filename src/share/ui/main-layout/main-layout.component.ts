import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouteTokens } from '@share/lib';
import { UiKitModule } from '@share/ui';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, UiKitModule, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  public readonly RouteTokens: typeof RouteTokens = RouteTokens;

  @Input() public title?: string;
}
