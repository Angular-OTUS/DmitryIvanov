import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

export type NewTask = {
  text: string;
  description: string;
};

@Component({
  selector: 'app-to-do-create-item',
  templateUrl: './to-do-create-item.component.html',
  styleUrls: ['./to-do-create-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoCreateItemComponent {
  public newTask: NewTask = { text: '', description: '' };

  @Output() public addTaskEvent: EventEmitter<NewTask> = new EventEmitter<NewTask>();

  public onSubmit(newTaskForm: NgForm): void {
    const { text, description }: NewTask = newTaskForm.value as NewTask;
    this.addTaskEvent.emit({ text, description });
    this.newTask.text = this.newTask.description = '';
  }
}
