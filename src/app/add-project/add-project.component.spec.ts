import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { AddProjectComponent } from './add-project.component';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['addProject']);
    projectServiceSpy.addProject.and.returnValue(of(new Project({ id: 1, name: 'Test Project' })));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.navigate.and.stub();
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: ProjectService, useValue: projectServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [ AddProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSave', () => {
    it('should call service', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      compiled.querySelector('button')?.click();
      expect(projectServiceSpy.addProject).toHaveBeenCalled();
    });

    it('should call navigate with correct params', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      compiled.querySelector('button')?.click();
      expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/project', 1]);
    });
  });
});
