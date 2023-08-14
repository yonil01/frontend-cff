import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from "@app/modules/home/home-routing.module";
import {UsersRoutingModule} from "@app/modules/users/users-routing.module";
import {UsersComponent} from "@app/modules/users/users.component";
import {HomeModule} from "@app/modules/home/home.module";
import {ShowComponent} from "@app/modules/users/show/show.component";
import {RegisterComponent} from "@app/modules/users/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UsersComponent,
    ShowComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HomeModule,
    ReactiveFormsModule
  ]
})
export class UsersModule {
}
