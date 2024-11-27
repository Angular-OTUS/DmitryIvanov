import { TestBed } from '@angular/core/testing';

import { ToDoFacadeService } from './to-do-facade.service';

describe('ToDoFacadeService', () => {
  let service: ToDoFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
