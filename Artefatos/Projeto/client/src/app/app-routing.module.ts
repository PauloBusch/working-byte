import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login-form/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { TrainingComponent } from './trainings/training-form/training.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AuthGuard } from './shared/guards/auth.service';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { UserComponent } from './users/user-form/user-form.component';
import { BottomSheetComponent } from './shared/components/bottom-sheet/bottom-sheet.component';
import { TrainingListComponent } from './trainings/training-list/training-list.component';
import { DietListComponent } from './diets/diet-list/diet-list.component';
import { DietComponent } from './diets/diet-forms/diet-form.component';
import { EquipamentListComponent } from './equipaments/equipament-list/equipament-list.component';
import { EquipamentFormComponent } from './equipaments/equipament-form/equipament-form.component';
import { CalendarFormComponent } from './calendar/calendar-form/calendar-form.component';
import { CalendarListComponent } from './calendar/calendar-list/calendar-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard], children: [
    { path: 'confirm', component: ConfirmDialogComponent, canActivate: [AuthGuard] },
    { path: 'training', component: TrainingListComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: BottomSheetComponent, data: { form: TrainingComponent } },
      { path: 'edit/:id', component: BottomSheetComponent, data: { form: TrainingComponent } }
    ] },
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: BottomSheetComponent, data: { form: UserComponent } },
      { path: 'edit/:id', component: BottomSheetComponent, data: { form: UserComponent } }
    ] },
    { path: 'equipaments', component: EquipamentListComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: BottomSheetComponent, data: { form: EquipamentFormComponent } },
      { path: 'edit/:id', component: BottomSheetComponent, data: { form: EquipamentFormComponent } }
    ] },
    { path: 'diets',   component: DietListComponent, canActivate: [AuthGuard], children: [
        {path: 'new', component: BottomSheetComponent, data: {form: DietComponent} },
        {path: 'edit/:id', component: BottomSheetComponent, data: { form: DietComponent} }
    ] },
    { path: 'calendars',   component: CalendarListComponent, canActivate: [AuthGuard],  children: [
      { path: 'new', component: BottomSheetComponent, data: { form: CalendarFormComponent } },
      { path: 'edit/:id', component: BottomSheetComponent, data: { form: CalendarFormComponent } }
    ] },

  ] },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
