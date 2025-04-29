import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import userDataFaker  from '../../../data/user-data-faker.json';
import { environment } from '../../../../environments/environment';

describe('AuthService', () => {
  const API : string = environment.apiGatewayUrl;
  const GATEWAY : string = 'auth-service';
  const CONTROLLER : string = 'Auth';

  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('signIn request success', () => {
    const signInParametersMock = { email: 'leonardo.rafael@gmail.com', password: 'Welcome@5005' };

    service.signIn(signInParametersMock.email, signInParametersMock.password).subscribe(result => {
      expect(result as any).toEqual(userDataFaker);
    });
  
    const req = httpTestingController.expectOne(`${API}/${GATEWAY}/${CONTROLLER}/SingIn`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(signInParametersMock);
    req.flush(userDataFaker);
  });
});
