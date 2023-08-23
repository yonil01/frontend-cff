import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from "@app/modules/users/users-routing.module";
import {UsersComponent} from "@app/modules/users/users.component";
import {RegisterComponent} from "@app/modules/users/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UtilsModule} from "@app/core/utils/utils.module";


@NgModule({
  declarations: [
    UsersComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    UtilsModule,
    FormsModule,
  ]
})
export class UsersModule {
}
