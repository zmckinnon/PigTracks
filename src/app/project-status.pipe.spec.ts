import { ProjectStatus } from './project';
import { ProjectStatusPipe } from './project-status.pipe';
import { TaskStatus } from './task';

describe('ProjectStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ProjectStatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should be To Do if no tasks', () => {
      const pipe = new ProjectStatusPipe();
      const projectStatus = pipe.transform({ id: 1, name: 'Test Project', tasks: [] });
      expect(projectStatus).toBe(ProjectStatus.ToDo);
  });

  it('should be To Do if all tasks are To Do', () => {
    const pipe = new ProjectStatusPipe();
    const projectStatus = pipe.transform({
          id: 1,
          name: 'Test Project',
          tasks: [
              {
                  name: 'Test Task',
                  status: TaskStatus.ToDo
              }
          ]
      });
      expect(projectStatus).toBe(ProjectStatus.ToDo);
  });

  it('should be Done if all tasks are Done', () => {
    const pipe = new ProjectStatusPipe();
    const projectStatus = pipe.transform({
          id: 1,
          name: 'Test Project',
          tasks: [
              {
                  name: 'Test Task',
                  status: TaskStatus.Done
              }
          ]
      });
      expect(projectStatus).toBe(ProjectStatus.Done);
  });

  it('should be In Progress if some tasks are To Do and some tasks are Done', () => {
    const pipe = new ProjectStatusPipe();
    const projectStatus = pipe.transform({
          id: 1,
          name: 'Test Project',
          tasks: [
              {
                  name: 'Test Task',
                  status: TaskStatus.ToDo
              },
              {
                  name: 'Test Task',
                  status: TaskStatus.Done
              }
          ]
      });
      expect(projectStatus).toBe(ProjectStatus.InProgress);
  });
  
});
