import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProjectService } from '../project.service';
import { AddProjectComponent } from './add-project.component';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let router: Router;

  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['addProject']);
    projectServiceSpy.addProject.and.returnValue(of({ id: 1, name: 'Test Project', tasks: [] }));
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ProjectService, useValue: projectServiceSpy }
      ],
      declarations: [ AddProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    router = TestBed.inject(Router);
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
      const navigateSpy = spyOn(router, 'navigate');
      const compiled = fixture.nativeElement as HTMLElement;
      compiled.querySelector('button')?.click();
      expect(navigateSpy).toHaveBeenCalledOnceWith(['/project', 1]);
    });
  });
});
