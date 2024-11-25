import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoInlineEditComponent } from './to-do-inline-edit.component';

describe('ToDoInlineEditComponent', () => {
  let component: ToDoInlineEditComponent;
  let fixture: ComponentFixture<ToDoInlineEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToDoInlineEditComponent],
    });
    fixture = TestBed.createComponent(ToDoInlineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
