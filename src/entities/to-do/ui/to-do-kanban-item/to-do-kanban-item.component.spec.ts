import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoKanbanItemComponent } from './to-do-kanban-item.component';

describe('ToDoKanbanItemComponent', () => {
  let component: ToDoKanbanItemComponent;
  let fixture: ComponentFixture<ToDoKanbanItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToDoKanbanItemComponent],
    });
    fixture = TestBed.createComponent(ToDoKanbanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
