import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoKanbanColumnComponent } from './to-do-kanban-column.component';

describe('ToDoKanbanColumnComponent', () => {
  let component: ToDoKanbanColumnComponent;
  let fixture: ComponentFixture<ToDoKanbanColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToDoKanbanColumnComponent],
    });
    fixture = TestBed.createComponent(ToDoKanbanColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
