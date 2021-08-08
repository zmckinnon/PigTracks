import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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
});
