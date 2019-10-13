import { Component, OnInit } from '@angular/core';
import {
  MatCardModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatSelectModule, MatToolbarModule,
  MatListModule, MatSidenavModule
} from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';
import { ListUserQuery } from '../models/queries/listUserQuery';
import { User } from '../models/user.models';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private listQuery: ListUserQuery;

  private users: User[];

  constructor(
    private userService: UserService
  ) {
    this.listQuery = new ListUserQuery(10, 1, true, 'user_created');
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.listQuery).subscribe(users => {
      this.users = users.List;
    });
  }

  edit() {

  }

  remove() {

  }
}
