import { Task } from './task';

export interface Project {
  id?: number;
  name: string;
  tasks: Task[];
}

export enum ProjectStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done"
}
