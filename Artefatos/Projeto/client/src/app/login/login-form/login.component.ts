import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthUserCommand } from '../models/commands/auth-user.command';
import { Router } from '@angular/router';
import { EErrorCode } from 'src/app/shared/models/EErrorCode.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  login() {
    const { value } = this.form;
    const command = new AuthUserCommand(
      value.login,
      value.password
    );
    this.authService.login(command).subscribe(authResult => {
      if (authResult.Auth) {
        localStorage.setItem('token', authResult.Token);
        this.router.navigate(['/menu']);
        return;
      }
      if (authResult.ErrorCode === EErrorCode.InvalidParams) {
        this.snackBar.open('Informe o login e a senha', 'OK', { duration: 3000 });
        return;
      }
      if (authResult.ErrorCode === EErrorCode.Fail) {
        this.snackBar.open('Senha inválida', 'OK', { duration: 3000 });
        return;
      }
      if (authResult.ErrorCode === EErrorCode.NotFound) {
        this.snackBar.open('Este login não está registrado no sistema!', 'OK', { duration: 3000 });
        return;
      }
      this.snackBar.open('Erro ao realizar login', 'OK', { duration: 3000 });
    });
  }
}
