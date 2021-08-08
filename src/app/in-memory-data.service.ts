import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project } from './project';
import { TaskStatus } from './task';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects: Project[] = [
      new Project(1, 'Project 1', [
        { name: 'Task 1', status: TaskStatus.ToDo },
        { name: 'Task 2', status: TaskStatus.Done }
      ]),
      new Project(2, 'Project 2', [
        { name: 'Task 1', status: TaskStatus.ToDo },
        { name: 'Task 2', status: TaskStatus.ToDo }
      ]),
      new Project(3, 'Project 3', [
        { name: 'Task 1', status: TaskStatus.Done },
        { name: 'Task 2', status: TaskStatus.Done }
      ]),
      new Project(4, 'Project 4', []),
      new Project(5, 'Project 5', []),
    ];
    return { projects };
  }
}
