import { Data, Params } from '@angular/router';

export enum RouteTokens {
  BACKLOG = 'backlog',
  BOARD = 'board',
}

export enum RouteParams {
  TASK_ID = 'taskId',
}

export interface AppRouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}
