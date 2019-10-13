import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login-form/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { TrainingComponent } from './trainings/training-form/training.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserComponent } from './users/user-form/user-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, children: [
    { path: 'training', component: TrainingComponent },
    { path: 'users', component: UserListComponent, children: [
      { path: 'new', component: UserComponent },
      { path: 'edit/:id', component: UserComponent },
    ] },
    { path: '',   redirectTo: '/menu/training', pathMatch: 'full' },

  ] },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
