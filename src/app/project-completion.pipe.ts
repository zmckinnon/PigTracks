import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './project';
import { TaskStatus } from './task';

@Pipe({
  name: 'projectCompletion'
})
export class ProjectCompletionPipe implements PipeTransform {

  transform(project: Project): string {
    const completeTasks = project.tasks.filter(task => task.status === TaskStatus.Done).length;
    const totalTasks = project.tasks.length;
    const percentageComplete = completeTasks / totalTasks * 100;
    if (totalTasks > 0) {
      return `${completeTasks}/${totalTasks} (${percentageComplete.toFixed()}%)`;
    }
    else {
      return 'No Tasks';
    }
  }

}
