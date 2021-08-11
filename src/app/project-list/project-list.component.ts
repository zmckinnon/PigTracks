import { Component, OnInit } from '@angular/core';
import { Project, ProjectStatus } from '../project';
import { ProjectService } from '../project.service';
import { TaskStatus } from '../task';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  allProjects: Project[] = [];
  projects: Project[] = [];
  statusFilter: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.allProjects = projects;
        this.projects = this.allProjects;
      });
  }

  onDeleteClick(project: Project): void {
    this.projectService.deleteProject(project.id!)
      .subscribe(() => {
        this.allProjects = this.projects.filter(p => p !== project);
        this.projects = this.allProjects;
      });
  }

  onSelectChange(): void {
    if (!this.statusFilter) {
      this.projects = this.allProjects;
    }
    else {
      this.projects = this.allProjects.filter(project => this.getProjectStatus(project) === this.statusFilter);
    }
  }

  private getProjectStatus(project: Project): ProjectStatus {
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
