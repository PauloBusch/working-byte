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
          localStorage.setItem('user', btoa(JSON.stringify(authResult.User)));
          this.loginEvent.emit(authResult.User);
        }
      }));
  }

  logout(): void {
    this.http.get<AuthResult>(`${this.url}/logout`).subscribe(
      (authResult) => {
        if (!authResult.Auth) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    );
  }

  getAccessToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }

    return JSON.parse(atob(user));
  }
}
