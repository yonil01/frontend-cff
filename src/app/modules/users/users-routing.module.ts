import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "@app/modules/home/home.component";
import {UsersComponent} from "@app/modules/users/users.component";
import {RegisterComponent} from "@app/modules/users/register/register.component";


const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'create', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
