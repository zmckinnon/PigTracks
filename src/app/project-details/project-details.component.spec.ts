import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProjectStatusPipe } from '../project-status.pipe';
import { ProjectService } from '../project.service';
import { TaskStatus } from '../task';
import { TaskStatusPipe } from '../task-status.pipe';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;


  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getProject', 'updateProject']);
    projectServiceSpy.getProject.and.returnValue(of(
      {
        id: 1,
        name: 'Test Project',
        tasks: [
          { name: 'Test Task', status: TaskStatus.ToDo }
        ]
      }
    ));
    projectServiceSpy.updateProject.and.returnValue(of(null));
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatIconModule
      ],
      providers: [
        { provide: ProjectService, useValue: projectServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 1
            })
          }
        }
      ],
      declarations: [
        ProjectDetailsComponent,
        ProjectStatusPipe,
        TaskStatusPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render project name heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Test Project');
  });

  it('should call service once with correct param', () => {
    expect(projectServiceSpy.getProject).toHaveBeenCalledOnceWith(1);
  });

  describe('onDeleteClick', () => {
    it('should call service', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      (compiled.querySelector('.delete-button') as HTMLElement).click();
      expect(projectServiceSpy.updateProject).toHaveBeenCalled();
    });
  });
});
