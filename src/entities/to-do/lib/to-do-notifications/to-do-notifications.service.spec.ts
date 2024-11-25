import { TestBed } from '@angular/core/testing';

import { ToDoNotificationsService } from './to-do-notifications.service';

describe('ToDoNotificationsService', () => {
  let service: ToDoNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
