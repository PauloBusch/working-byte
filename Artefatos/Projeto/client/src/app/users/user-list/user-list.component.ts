import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MatCardModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatSelectModule, MatToolbarModule,
  MatListModule, MatSidenavModule, MatSnackBar
} from '@angular/material';
import { UserService } from 'src/app/shared/services/user.service';
import { ListUserQuery } from '../models/queries/listUserQuery';
import { User } from '../models/user.models';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { RemoveUserCommand } from '../models/commands/removeUserCommand';
import { QueryResult } from 'src/app/shared/models/QueryResult.model';
import { Observable } from 'rxjs';
import { AsyncQuery } from 'src/app/shared/models/asyncQuery';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  private listQuery: ListUserQuery;

  private users = new AsyncQuery<User>();

  constructor(
    private userService: UserService,
    private confirmDialogService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {
    this.listQuery = new ListUserQuery(10, 1, true, 'user_created');
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
