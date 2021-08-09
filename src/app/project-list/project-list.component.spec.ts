import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProjectStatusPipe } from '../project-status.pipe';
import { ProjectService } from '../project.service';
import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;

  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getProjects', 'deleteProject']);
    projectServiceSpy.getProjects.and.returnValue(of([
      { id: 1, name: 'Test Project', tasks: [] }
    ]));
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: ProjectService, useValue: projectServiceSpy }
      ],
      declarations: [
        ProjectListComponent,
        ProjectStatusPipe
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Projects title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Projects');
  });

  it('should render a project with name: Test Project', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ul > li')?.textContent).toContain('Test Project');
  });

  it('should call service once', () => {
    expect(projectServiceSpy.getProjects).toHaveBeenCalledTimes(1);
  });

  describe('onDeleteClick', () => {
    it('should call service', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      compiled.querySelector('button')?.click();
      expect(projectServiceSpy.deleteProject).toHaveBeenCalledOnceWith(1);
    });
  });
});
