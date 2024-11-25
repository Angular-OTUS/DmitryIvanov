import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ToDoFacadeService } from '@entities/to-do';
import { NewTask } from '@features/to-do-create';
import { TaskItem } from '@share/api';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent implements OnInit {
  constructor(protected readonly toDoFacadeService: ToDoFacadeService) {}

  public onAddTaskItem(newTask: NewTask): void {
    this.toDoFacadeService.addTaskItem(newTask);
  }

  public onChangeTaskItem(taskItem: TaskItem): void {
    this.toDoFacadeService.updateTaskItem(taskItem);
  }

  public onDeleteTaskItem(id: string): void {
    this.toDoFacadeService.deleteTaskItem(id);
  }

  public ngOnInit(): void {
    this.toDoFacadeService.loadTasks();
  }
}
