import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoFilterComponent, ToDoListComponent, ToDoStatusFilterPipe } from '@entities/to-do';
import { ToDoCreateComponent } from '@features/to-do-create';
import { RouteParams } from '@share/lib';
import { MainLayoutComponent, SpinnerComponent, UiKitModule } from '@share/ui';
import { BacklogPageComponent } from './ui';

const routes: Routes = [
  {
    path: '',
    component: BacklogPageComponent,
    children: [
      {
        path: `:${RouteParams.TASK_ID}`,
        loadComponent: () =>
          // eslint-disable-next-line @typescript-eslint/typedef
          import('./ui/to-do-desc-view/to-do-desc-view.component').then(c => c.ToDoDescViewComponent),
      },
    ],
  },
];

@NgModule({
  declarations: [BacklogPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiKitModule,
    MainLayoutComponent,
    ToDoCreateComponent,
    ToDoListComponent,
    ToDoFilterComponent,
    SpinnerComponent,
    ToDoStatusFilterPipe,
  ],
  exports: [RouterModule],
})
export class BacklogModule {}
