import { Environment } from './environment.types';

export const environment: Environment = {
  production: true,
  apiUrl: 'http://localhost:3000/todos',
  imports: [],
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
