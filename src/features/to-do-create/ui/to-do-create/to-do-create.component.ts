import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ButtonComponent, TooltipDirective, UiKitModule } from '@share/ui';
import { TaskNameDirective } from '../../lib';

export type NewTask = {
  text: string;
  description: string;
};

@Component({
  selector: 'app-to-do-create',
  templateUrl: './to-do-create.component.html',
  styleUrls: ['./to-do-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, UiKitModule, TaskNameDirective, ButtonComponent, TooltipDirective],
})
export class ToDoCreateComponent {
  public newTask: NewTask = { text: '', description: '' };

  @Output() public addTaskEvent: EventEmitter<NewTask> = new EventEmitter<NewTask>();

  public onSubmit(newTaskForm: NgForm): void {
    const { text, description }: NewTask = newTaskForm.value as NewTask;
    this.addTaskEvent.emit({ text, description });
    this.newTask.text = this.newTask.description = '';
  }
}
