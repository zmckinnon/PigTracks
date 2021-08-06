import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects: Project[] = [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
      { id: 3, name: 'Project 3' },
      { id: 4, name: 'Project 4' },
      { id: 5, name: 'Project 5' }
    ];
    return {projects};
  }
}
