import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ToDoKanbanComponent, ToDoListComponent } from '@entities/to-do-list';
import { ToDoCreateComponent } from '@features/to-do-create';
import { MainLayoutComponent, SpinnerComponent, UiKitModule } from '@share/ui';
import { BoardPageComponent } from './ui';

const routes: Routes = [
  {
    path: '',
    component: BoardPageComponent,
  },
];

@NgModule({
  declarations: [BoardPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiKitModule,
    MainLayoutComponent,
    SpinnerComponent,
    ToDoCreateComponent,
    ToDoKanbanComponent,
    ToDoListComponent,
  ],
  exports: [RouterModule],
})
export class BoardModule {}
