import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from './task';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {

  transform(taskStatus: TaskStatus): boolean {
    return taskStatus === TaskStatus.Done;
  }

}
