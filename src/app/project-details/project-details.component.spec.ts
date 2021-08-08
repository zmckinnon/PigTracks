import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProjectService } from '../project.service';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;


  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getProject']);
    projectServiceSpy.getProject.and.returnValue(of({ id: 1, name: 'Test Project', tasks: [] }));
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
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
        ProjectDetailsComponent
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
});