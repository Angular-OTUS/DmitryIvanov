import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteTokens } from '@share/lib';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: RouteTokens.BACKLOG,
    pathMatch: 'full',
  },
  {
    title: 'Backlog',
    path: RouteTokens.BACKLOG,
    loadChildren: async () => (await import('./backlog/backlog.module')).BacklogModule,
  },
  {
    title: 'Board',
    path: RouteTokens.BOARD,
    loadChildren: async () => (await import('./board/board.module')).BoardModule,
  },
  {
    path: '**',
    redirectTo: `/${RouteTokens.BACKLOG}`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
