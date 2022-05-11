import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  model: Project = { name: '', tasks: [] };

  public message: string = 'Name is required. Please enter a name.';

  constructor(private router: Router, private projectService: ProjectService) { }

  onSave(): void {
    this.projectService.addProject(this.model)
      .subscribe(project => {
        this.router.navigate(['/project', project.id]);
      });
  }
}
