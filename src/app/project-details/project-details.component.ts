import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project?: Project;
  projectId?: number;

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
}
