import { ToDoStatusFilterPipe } from './to-do-filter.pipe';

describe('ToDoFilterPipe', () => {
  it('create an instance', () => {
    const pipe: ToDoStatusFilterPipe = new ToDoStatusFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
