import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { User } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  private readonly API : string = environment.apiGatewayUrl;
  private readonly GATEWAY : string = 'auth-service';
  private readonly CONTROLLER : string = 'Auth';
  private http = inject(HttpClient);

  signIn(email: string, password: string): Observable<User> {
    const body = {
      email : email, 
      password : password
    };
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<User>(`${this.API}/${this.GATEWAY}/${this.CONTROLLER}/SingIn`, body, { headers: headers })
                    .pipe(
                      catchError(this.errorHandler),
                      map((userResponse : User) => {
                        this.isAuthenticated = true;
                        localStorage.setItem('token', userResponse.tokenResponse.accessToken);
                        return userResponse;
                    }));
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) 
    {
      console.error('An error occurred:', error.error.message);
    } 
    else 
    {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(() => error);
  }

}
