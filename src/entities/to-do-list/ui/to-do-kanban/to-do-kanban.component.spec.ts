import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoKanbanComponent } from './to-do-kanban.component';

describe('ToDoKanbanComponent', () => {
  let component: ToDoKanbanComponent;
  let fixture: ComponentFixture<ToDoKanbanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToDoKanbanComponent],
    });
    fixture = TestBed.createComponent(ToDoKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
