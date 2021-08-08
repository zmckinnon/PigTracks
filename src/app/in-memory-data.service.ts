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
      {
        id: 1,
        name: 'Project 1',
        tasks: [
          { name: 'Task 1', status: TaskStatus.ToDo },
          { name: 'Task 2', status: TaskStatus.Done }
        ]
      },
      {
        id: 2,
        name: 'Project 2',
        tasks: [
          { name: 'Task 1', status: TaskStatus.ToDo },
          { name: 'Task 2', status: TaskStatus.ToDo }
        ]
      },
      {
        id: 3,
        name: 'Project 3',
        tasks: [
          { name: 'Task 1', status: TaskStatus.Done },
          { name: 'Task 2', status: TaskStatus.Done }
        ]
      },
      { id: 4, name: 'Project 4', tasks: [] },
      { id: 5, name: 'Project 5', tasks: [] }
    ];
    return { projects };
  }
}
