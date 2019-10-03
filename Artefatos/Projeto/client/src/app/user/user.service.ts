import { Injectable } from '@angular/core';
import { User } from './models/user.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): Observable<User[]>{
    return null;
  }
}
