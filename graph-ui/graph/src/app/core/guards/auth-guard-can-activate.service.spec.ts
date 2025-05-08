import { TestBed } from '@angular/core/testing';

import { AuthGuardCanActivateService } from './auth-guard-can-activate.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthGuardCanActivateService', () => {
  let service: AuthGuardCanActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(AuthGuardCanActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
