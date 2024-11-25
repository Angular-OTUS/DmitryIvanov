import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UiKitModule } from '@share/ui';

@Component({
  selector: 'app-to-do-inline-edit',
  standalone: true,
  imports: [CommonModule, UiKitModule, FormsModule],
  templateUrl: './to-do-inline-edit.component.html',
  styleUrls: ['./to-do-inline-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoInlineEditComponent implements OnInit {
  public updatedText: string = '';

  @Input() public text?: string;
  @Output() public save: EventEmitter<string> = new EventEmitter<string>();
  @Output() public cancel: EventEmitter<void> = new EventEmitter<void>();

  public isSaveReady(): boolean {
    return this.updatedText !== this.text && this.updatedText.trim().length > 0;
  }

  public onSave(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.save.emit(this.updatedText);
  }

  public onCancel(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.cancel.emit();
  }

  public ngOnInit(): void {
    this.updatedText = this.text ?? '';
  }
}
