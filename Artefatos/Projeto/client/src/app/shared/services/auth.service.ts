import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthUserCommand } from 'src/app/login/models/commands/auth-user.command';
import { environment } from '../../../environments/environment';
import { AuthResult } from '../models/AuthResult.model';
import { User } from 'src/app/users/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginEvent = new EventEmitter<User>();

  private url: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  login(command: AuthUserCommand): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.url}/login`, command)
      .pipe(tap(authResult => {
        if (authResult.Auth) {
          localStorage.setItem('token', authResult.Token);
          this.loginEvent.emit(authResult.User);
        }
      }));
  }

  // logout(): Observable<AuthResult> {

  // }

  getAccessToken() {
    return localStorage.getItem('token');
  }
}
