import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import {
  MatCardModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatSelectModule, MatToolbarModule,
  MatListModule, MatSidenavModule, MatSnackBar, MatPaginator
} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';

import { UserService } from 'src/app/shared/services/user.service';
import { ListUserQuery } from '../models/queries/listUserQuery';
import { User } from '../models/user.models';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { RemoveUserCommand } from '../models/commands/removeUserCommand';
import { QueryResult } from 'src/app/shared/models/QueryResult.model';
import { Observable } from 'rxjs';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';
import { Storage } from 'src/app/shared/utils/storage';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private listQuery: ListUserQuery;
  private users = new AsyncQuery<User>();

  constructor(
    private userService: UserService,
    private confirmDialogService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {
    const limit = Storage.get('users.limit', 5);
    const page = Storage.get('users.page', 1);
    this.listQuery = new ListUserQuery(limit, page, true, 'user_created');
  }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    this.users.subsc.unsubscribe();
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

  edit(id: string) {

  }

  remove(id: string) {
    this.confirmDialogService.confirmRemove('Deseja remover o usuário?').subscribe(confirm => {
      if (!confirm) {
        return;
      }

      const command = new RemoveUserCommand(id);
      this.userService.removeUser(command).subscribe(
        (result) => {
          if (result.Rows > 0) {
            this.users.list = this.users.list.filter(us => us.id !== id);
            this.snackBar.open('Usuário removido com sucesso!', 'OK', { duration: 3000 });
            return;
          }
          this.snackBar.open('Falha ao remover o usuário!', 'OK', { duration: 3000 });        }
      );
    });
  }
}
