import { Pipe, PipeTransform } from '@angular/core';
import { Project, ProjectStatus } from './project';
import { TaskStatus } from './task';

@Pipe({
  name: 'projectStatus'
})
export class ProjectStatusPipe implements PipeTransform {
  transform(project: Project): ProjectStatus {
    // if there are no tasks or if all tasks are To Do, it should be To Do
    if (project.tasks.length === 0 || project.tasks.every(task => task.status === TaskStatus.ToDo)) {
      return ProjectStatus.ToDo;
    }
    // if all tasks are Done, it should be Done
    if (project.tasks.every(task => task.status === TaskStatus.Done)) {
      return ProjectStatus.Done;
    }
    // if some tasks are To Do and some tasks are Done, it should be In Progress
    else {
      return ProjectStatus.InProgress;
    }
  }
}
