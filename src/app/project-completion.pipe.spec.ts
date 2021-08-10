import { ProjectCompletionPipe } from './project-completion.pipe';
import { TaskStatus } from './task';

describe('ProjectCompletionPipe', () => {
  it('create an instance', () => {
    const pipe = new ProjectCompletionPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return correct value when no tasks', () => {
    const pipe = new ProjectCompletionPipe();
    const project = { name: 'Test Project', tasks: [] };
    const projectCompletionString = pipe.transform(project);
    expect(projectCompletionString).toEqual('No Tasks');
  });

  it('should return correct value when there are tasks', () => {
    const pipe = new ProjectCompletionPipe();
    const project = { name: 'Test Project', tasks: [ { name: 'Task 1', status: TaskStatus.ToDo }, { name: 'Task 2', status: TaskStatus.Done } ] };
    const projectCompletionString = pipe.transform(project);
    expect(projectCompletionString).toEqual('1/2 (50%)');
  });
});
