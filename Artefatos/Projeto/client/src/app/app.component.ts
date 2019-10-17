import { Component, OnInit } from '@angular/core';
import { User } from './users/models/user.models';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public currentUser: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.authService.loginEvent.subscribe(user => this.currentUser = user);
  }
}
