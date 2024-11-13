import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoDescViewComponent } from './to-do-desc-view.component';

describe('ToDoItemViewComponent', () => {
  let component: ToDoDescViewComponent;
  let fixture: ComponentFixture<ToDoDescViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoDescViewComponent],
    });
    fixture = TestBed.createComponent(ToDoDescViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
