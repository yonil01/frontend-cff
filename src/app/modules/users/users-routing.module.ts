import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from "@app/modules/users/users.component";
import {RegisterComponent} from "@app/modules/users/register/register.component";


const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'create', component: RegisterComponent },
  { path: 'edit/:id', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
