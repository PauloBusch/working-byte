import { Component, OnInit, Input, Output, Host, EventEmitter } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Patterns } from 'src/app/shared/utils/validators';
import { UserService } from 'src/app/shared/services/user.service';
import { CreateUserCommand } from '../models/commands/createUserCommand';
import { Random } from 'src/app/shared/utils/random';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';
import { UpdateUserCommand } from '../models/commands/updateUserCommand';
import { GetUserQuery } from '../models/queries/getUserQuery';
import { UserList } from '../models/view-models/user.list';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserComponent implements OnInit {
  private isNew: boolean;
  private refId: string;

  private form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private patterns: Patterns,
    private userService: UserService,
    private random: Random,
    private bottomSheet: MatBottomSheet,
    private dataService: DataService<UserList>
  ) {
    this.form = this.fb.group({
      first_name: new FormControl('', Validators.required),
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.patterns.email)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(this.patterns.phone)]],
      cpf: ['', [Validators.required, Validators.pattern(this.patterns.cpf)]],
      age: ['', Validators.required],
      is_personal: [false],
      sexo: ['', Validators.required],
      login: ['', [Validators.required, Validators.pattern(this.patterns.login)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {  }

  loadData(params: { id: string }) {
    this.refId = params.id;
    if (!this.refId) {
      this.isNew = true;
      return;
    }

    this.form.removeControl('password');
    const query = new GetUserQuery(this.refId);
    this.userService.getUserById(query).subscribe(result => {
      if (result.ErrorCode === EErrorCode.NotFound || result.Rows === 0) {
        this.snackBar.open('Usuário inexistente', 'OK', { duration: 3000 });
        return;
      }

      const user = result.List[0];
      this.form.patchValue(user);
    });
  }

  close() {
    this.bottomSheet.dismiss();
  }

  save() {
    if (this.form.invalid) {
      this.snackBar.open('Preencha os campos obrigatórios', 'OK', { duration: 3000 });
      return;
    }

    const value = this.form.value;
    if (this.isNew) {
      this.create(value);
    } else {
      this.update(value);
    }
  }

  private create(values: any) {
    this.refId = this.random.NewId();
    const command = new CreateUserCommand(
      this.refId,
      values.first_name,
      values.last_name,
      values.email,
      values.address,
      values.phone,
      values.cpf,
      values.age,
      values.is_personal,
      values.sexo,
      values.login,
      values.password
    );
    this.userService.createUser(command).subscribe(result => {
      if (result.ErrorCode ===  EErrorCode.None) {
        this.snackBar.open('Usuário salvo com sucesso', 'OK', { duration: 3000 });
        this.updateList(values);
        this.close();
        return;
      }
      if (result.ErrorCode ===  EErrorCode.InvalidParams) {
        this.snackBar.open('Existem campos inválidos', 'OK', { duration: 3000 });
        return;
      }
      const existsName = 'User with first_name and last_name already exists';
      if (result.ErrorCode ===  EErrorCode.DuplicateUnique && existsName.search(result.Message) === 0) {
        this.snackBar.open('Já existe um usuário com esse nome cadastrado', 'OK', { duration: 3000 });
        return;
      }
      const existsEmail = 'Parameter email already exists';
      if (result.ErrorCode ===  EErrorCode.DuplicateUnique && existsEmail.search(result.Message) === 0) {
        this.snackBar.open('Já existe um usuário com esse email cadastrado', 'OK', { duration: 3000 });
        return;
      }
      const existsLogin = 'Parameter login already exists';
      if (result.ErrorCode ===  EErrorCode.DuplicateUnique && existsLogin.search(result.Message) === 0) {
        this.snackBar.open('Já existe um usuário com esse login cadastrado', 'OK', { duration: 3000 });
        return;
      }
      this.snackBar.open(result.Message, 'OK', { duration: 3000 });
    });
  }

  private update(values: any) {
    const command = new UpdateUserCommand(
      this.refId,
      values.first_name,
      values.last_name,
      values.email,
      values.address,
      values.phone,
      values.cpf,
      values.age,
      values.is_personal,
      values.sexo,
      values.login
    );
    this.userService.updateUser(command).subscribe(result => {
      if (result.ErrorCode ===  EErrorCode.None) {
        this.snackBar.open('Usuário salvo com sucesso', 'OK', { duration: 3000 });
        this.updateList(values);
        this.close();
        return;
      }
      if (result.ErrorCode ===  EErrorCode.InvalidParams) {
        this.snackBar.open('Existem campos inválidos', 'OK', { duration: 3000 });
        return;
      }
      const existsName = 'User with first_name and last_name already exists';
      if (result.ErrorCode ===  EErrorCode.DuplicateUnique && existsName.search(result.Message) === 0) {
        this.snackBar.open('Já existe um usuário com esse nome cadastrado', 'OK', { duration: 3000 });
        return;
      }
      const existsEmail = 'Parameter email already exists';
      if (result.ErrorCode ===  EErrorCode.DuplicateUnique && existsEmail.search(result.Message) === 0) {
        this.snackBar.open('Já existe um usuário com esse email cadastrado', 'OK', { duration: 3000 });
        return;
      }
      const existsLogin = 'Parameter login already exists';
      if (result.ErrorCode ===  EErrorCode.DuplicateUnique && existsLogin.search(result.Message) === 0) {
        this.snackBar.open('Já existe um usuário com esse login cadastrado', 'OK', { duration: 3000 });
        return;
      }
      this.snackBar.open(result.Message, 'OK', { duration: 3000 });
    });
  }

  private updateList(values: any) {
    const user = new UserList(
      this.refId,
      values.first_name,
      values.last_name,
      values.email
    );
    this.dataService.update(user);
  }

  hasError(field: string, error: string): boolean {
    return this.form.get(field).hasError(error);
  }
}
