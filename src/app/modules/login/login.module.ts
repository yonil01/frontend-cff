import { NgModule } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoginComponent} from "./login.component";
import {Store} from "@ngrx/store";
@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    NgIf,
  ],
  providers: [
  ],
})
export class LoginModule {}
