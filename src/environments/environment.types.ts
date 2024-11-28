import { LanguageData } from '@share/lib';

export type Environment = {
  production: boolean;
  apiUrl: string;
  imports: Array<unknown>;
  languages: LanguageData[];
};
