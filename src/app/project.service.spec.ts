import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Project } from './project';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', () => {
    let service: ProjectService = TestBed.inject(ProjectService);
    expect(service).toBeTruthy();
  });

  describe('getProjects', () => {
    it('should call correct HTTP endpoint', (done) => {
      let httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
      httpClientSpy.get.and.returnValue(of([]));
      let service: ProjectService = new ProjectService(httpClientSpy);
      service.getProjects().subscribe(() => {
        done();
      });
      expect(httpClientSpy.get).toHaveBeenCalledOnceWith('api/projects');
    });
  });

  describe('getProject', () => {
    it('should call correct HTTP endpoint', (done) => {
      let httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
      httpClientSpy.get.and.returnValue(of({}));
      let service: ProjectService = new ProjectService(httpClientSpy);
      service.getProject(1).subscribe(() => {
        done();
      });
      expect(httpClientSpy.get).toHaveBeenCalledOnceWith('api/projects/1');
    });
  });

  describe('addProject', () => {
    it('should call correct HTTP endpoint', (done) => {
      let httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['post']);
      httpClientSpy.post.and.returnValue(of({}));
      let service: ProjectService = new ProjectService(httpClientSpy);
      service.addProject({} as Project).subscribe(() => {
        done();
      });
      expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });

  describe('updateProject', () => {
    it('should call correct HTTP endpoint', (done) => {
      let httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['put']);
      httpClientSpy.put.and.returnValue(of({}));
      let service: ProjectService = new ProjectService(httpClientSpy);
      service.updateProject({} as Project).subscribe(() => {
        done();
      });
      expect(httpClientSpy.put).toHaveBeenCalled();
    });
  });

  describe('deleteProject', () => {
    it('should call correct HTTP endpoint', (done) => {
      let httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['delete']);
      httpClientSpy.delete.and.returnValue(of({}));
      let service: ProjectService = new ProjectService(httpClientSpy);
      service.deleteProject(1).subscribe(() => {
        done();
      });
      expect(httpClientSpy.delete).toHaveBeenCalled();
    });
  });

});
