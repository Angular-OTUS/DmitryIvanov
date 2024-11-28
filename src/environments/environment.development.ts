import { isDevMode } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Environment } from './environment.types';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3000/todos',
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  languages: [
    {
      code: 'en-US',
      label: 'En',
      change: ({ protocol, hostname, pathname, search, hash }: URL) =>
        `${protocol}//${hostname}:4200${pathname}${search}${hash}`,
    },
    {
      code: 'ru',
      label: 'Ru',
      change: ({ protocol, hostname, pathname, search, hash }: URL) =>
        `${protocol}//${hostname}:4201${pathname}${search}${hash}`,
    },
  ],
};
