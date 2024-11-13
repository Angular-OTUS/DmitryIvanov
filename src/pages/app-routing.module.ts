import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteTokens } from '@share/lib';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: RouteTokens.Backlog,
    pathMatch: 'full',
  },
  {
    title: 'Backlog',
    path: RouteTokens.Backlog,
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: () => import('./backlog/backlog.module').then(m => m.BacklogModule),
  },
  {
    path: '**',
    redirectTo: `/${RouteTokens.Backlog}`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}