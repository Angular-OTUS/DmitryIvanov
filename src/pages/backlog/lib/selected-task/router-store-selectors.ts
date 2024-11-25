import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { AppRouterStateUrl, RouteParams } from '@share/lib';

export const selectRouter: MemoizedSelector<object, RouterReducerState<AppRouterStateUrl>> = createFeatureSelector<
  RouterReducerState<AppRouterStateUrl>
>('router');

export const selectTaskIdParam: MemoizedSelector<object, string | undefined> = createSelector(
  selectRouter,
  (routerState: RouterReducerState<AppRouterStateUrl>): string | undefined => {
    const params: Params = routerState.state ? routerState.state.params : {};
    return params[RouteParams.TASK_ID] as string | undefined;
  }
);
