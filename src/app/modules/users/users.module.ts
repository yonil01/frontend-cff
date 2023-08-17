import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from "@app/modules/users/users-routing.module";
import {UsersComponent} from "@app/modules/users/users.component";
import {ShowComponent} from "@app/modules/users/show/show.component";
import {RegisterComponent} from "@app/modules/users/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UtilsModule} from "@app/core/utils/utils.module";


@NgModule({
  declarations: [
    UsersComponent,
    ShowComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    UtilsModule,
  ]
})
export class UsersModule {
}
