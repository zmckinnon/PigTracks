import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Task, TaskStatus } from '../task';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project?: Project;
  projectId?: number;
  model: Task = { name: '', status: TaskStatus.ToDo };

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = parseInt(params.id);
      this.getProject(this.projectId);
    })
  }

  getProject(projectId: number): void {
    this.projectService.getProject(projectId)
      .subscribe(project => this.project = project);
  }

  onAdd(): void {
    this.project?.tasks?.push(this.model);
    this.projectService.updateProject(this.project!)
      .subscribe(project => {
        this.project = project || { ...this.project } as Project;
        this.clearTask();
      });
  }

  onChangeTaskStatus(task: Task): void {
    if (task.status === TaskStatus.ToDo) {
      task.status = TaskStatus.Done;
    }
    else {
      task.status = TaskStatus.ToDo;
    }
    this.projectService.updateProject(this.project!)
      .subscribe(project => {
        this.project = project || { ...this.project } as Project;
      });
  }

  private clearTask() : void {
    this.model = { name: '', status: TaskStatus.ToDo };
  }
}
