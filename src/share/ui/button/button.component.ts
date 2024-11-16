import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { UiKitModule } from '@share/ui';

type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, UiKitModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() public disabled?: boolean;
  @Input() public type: ButtonType = 'button';
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter<void>();

  public onClick(event: MouseEvent): void {
    event.stopPropagation();

    this.clickEvent.emit();
  }
}
