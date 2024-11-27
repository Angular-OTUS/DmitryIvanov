import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectTaskIdParam } from './router-store-selectors';

@Injectable({
  providedIn: 'root',
})
export class SelectedTaskService {
  public selectedTaskId$: Observable<string | undefined> = this.store.select(selectTaskIdParam);

  constructor(private readonly store: Store) {}
}
