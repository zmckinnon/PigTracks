import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsLocalStorageKey: string = 'projects';

  getProjects(): Observable<Project[]> {
    const projectsAsJson = localStorage.getItem(this.projectsLocalStorageKey) ?? '[]';
    return of(JSON.parse(projectsAsJson));
  }

  getProject(id: number): Observable<Project> {
    return this.getProjects()
      .pipe(map((projects: Project[]) => {
        return projects.find(project => project.id === id)!;
      }));
  }

  addProject(project: Project): Observable<Project> {
    return this.getProjects()
      .pipe(map((projects: Project[]) => {
        project.id = this.getNewId(projects);
        projects.push(project);
        const projectsAsJsonString = JSON.stringify(projects);
        localStorage.setItem(this.projectsLocalStorageKey, projectsAsJsonString)
        return project;
      }));
  };

  updateProject(project: Project): Observable<null | Project> {
    return this.getProjects()
      .pipe(map((projects: Project[]) => {
        projects = projects.map(p => p.id === project.id ? project : p);
        const projectsAsJsonString = JSON.stringify(projects);
        localStorage.setItem(this.projectsLocalStorageKey, projectsAsJsonString)
        return {...project};
      }));
  }

  deleteProject(id: number): Observable<Project> {
    return this.getProjects()
      .pipe(map((projects: Project[]) => {
        const project = projects.find(project => project.id === id);
        projects = projects.filter(project => project.id != id);
        const projectsAsJsonString = JSON.stringify(projects);
        localStorage.setItem(this.projectsLocalStorageKey, projectsAsJsonString)
        return project!;
      }));
  }

  private getNewId(projects: Project[]): number {
    if (projects.length === 0) {
      return 1;
    }
    const projectIds = projects.map(project => project.id!);
    const maxProjectId = Math.max(...projectIds);
    return maxProjectId + 1;
  }
}
