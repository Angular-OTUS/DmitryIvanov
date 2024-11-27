import { ActivatedRouteSnapshot, Data, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { AppRouterStateUrl } from '@share/lib';

export class AppSerializer implements RouterStateSerializer<AppRouterStateUrl> {
  public serialize(state: RouterStateSnapshot): AppRouterStateUrl {
    let currentRoute: ActivatedRouteSnapshot;
    currentRoute = state.root;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const {
      url,
      root: { queryParams },
    }: {
      url: string;
      root: { queryParams: Params };
    } = state;
    const { params, data }: { params: Params; data: Data } = currentRoute;

    return { url, params, queryParams, data };
  }
}
