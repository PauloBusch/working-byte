import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatSnackBar, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import {PageEvent} from '@angular/material/paginator';

import { UserService } from 'src/app/shared/services/user.service';
import { ListUserQuery } from '../models/queries/listUserQuery';
import { User } from '../models/user.models';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { RemoveUserCommand } from '../models/commands/removeUserCommand';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { Storage } from 'src/app/shared/utils/storage';
import { UserComponent } from '../user-form/user-form.component';
import { UserList } from '../models/view-models/user.list';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  private listQuery: ListUserQuery;
  private users = new AsyncQuery<UserList>();

  constructor(
    private userService: UserService,
    private confirmDialogService: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private dataService: DataService<UserList>
  ) {
    const limit = Storage.get('users.limit', 5);
    const page = Storage.get('users.page', 1);
    this.listQuery = new ListUserQuery(limit, page, false, 'user_created');
  } 

  ngOnInit() {
    this.loadUsers();
    this.dataService.source.subscribe(user => this.pushUserList(user));
  }

  ngOnDestroy() {
    this.users.subsc.unsubscribe();
  }

  public pushUserList(user: UserList) {
    if (!user) {
      return;
    }

    const indexUser = this.users.list.findIndex(us => us.id === user.id);
    if (indexUser === -1) {
      this.users.list.unshift(user);
    } else {
      this.users.list[indexUser] = user;
    }
  }

  public removeUserList(id: string) {
    this.users.list = this.users.list.filter(us => us.id !== id);
  }

  loadUsers() {
    this.users.$list = this.userService.getUsers(this.listQuery);
    this.users.subsc = this.users.$list.subscribe();
  }

  pageChange(ev: PageEvent) {
    this.listQuery.page = ev.pageIndex + 1;
    this.listQuery.limit = ev.pageSize;
    Storage.set('users.limit', this.listQuery.limit);
    Storage.set('users.page', this.listQuery.page);
    this.loadUsers();
  }

  remove(id: string) {
    this.confirmDialogService.confirmRemove('Deseja remover o usuário?').subscribe(confirm => {
      if (!confirm) {
        return;
      }

      const command = new RemoveUserCommand(id);
      this.userService.removeUser(command).subscribe((result) => {
          if (result.Rows > 0) {
            this.snackBar.open('Usuário removido com sucesso!', 'OK', { duration: 3000 });
            this.removeUserList(id);
            return;
          }
          this.snackBar.open('Falha ao remover o usuário!', 'OK', { duration: 3000 });
        }
      );
    });
  }
}
