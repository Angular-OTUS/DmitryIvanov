import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { environment } from '@environments';
import { LanguageData } from '@share/lib';

@Injectable({
  providedIn: 'root',
})
export class ChangeLanguageService {
  private readonly languages: LanguageData[] = environment.languages;

  constructor(@Inject(LOCALE_ID) private readonly localeId: string) {}

  public get currentLanguageCode(): string {
    const current: LanguageData | undefined = this.languages.find((data: LanguageData) => data.code === this.localeId);
    return current?.label ?? 'En';
  }

  public setNextLanguage(): void {
    const currentIdx: number = this.languages.findIndex((data: LanguageData) => data.code === this.localeId);
    const nextIdx: number = currentIdx < 0 || currentIdx + 1 === this.languages.length ? 0 : currentIdx + 1;
    window.location.href = this.languages[nextIdx].change(new URL(window.location.href));
  }
}
