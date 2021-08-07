import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
  }

  getProject(id: number) {
    return this.getProjects().pipe(
      map((projects: Project[]) => projects.find(project => project.id === id)!)
    );
  }
}
