import { TaskStatus } from './task';
import { TaskStatusPipe } from './task-status.pipe';

describe('TaskStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskStatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return whether the task checkbox should be checked', () => {
    const pipe = new TaskStatusPipe();
    let checked = pipe.transform(TaskStatus.ToDo);
    expect(checked).toBeFalse();
    
    checked = pipe.transform(TaskStatus.Done);
    expect(checked).toBeTrue();
  });
});
