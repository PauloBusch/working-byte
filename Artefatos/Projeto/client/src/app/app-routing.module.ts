import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TrainingComponent } from './training/training.component';
import { MenuComponent } from './shared/menu/menu.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserComponent } from './user/user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, children: [
    { path: 'training', component: TrainingComponent },
    { path: 'users', component: UserListComponent, children: [
      { path: 'new', component: UserComponent },
      { path: 'edit/:identifier', component: UserComponent },
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
