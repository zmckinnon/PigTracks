import { Task, TaskStatus } from './task';

export class Project {
  id: number;
  name: string;
  tasks: Task[];
  status: ProjectStatus;

  constructor(id: number, name: string, tasks: Task[]) {
    this.id = id;
    this.name = name;
    this.tasks = tasks;
    this.status = this.getStatus();
  };

  private getStatus = () : ProjectStatus => {
    // if there are no tasks or if all tasks are To Do, it should be To Do
    if (this.tasks.length === 0 || this.tasks.every(task => task.status === TaskStatus.ToDo)) {
      return ProjectStatus.ToDo;
    }
    // if all tasks are Done, it should be Done
    if (this.tasks.every(task => task.status === TaskStatus.Done)) {
      return ProjectStatus.Done;
    }
    // if some tasks are To Do and some tasks are Done, it should be In Progress
    else {
      return ProjectStatus.InProgress;
    }
  }
}

export enum ProjectStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done"
}
