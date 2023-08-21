import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './modules/users/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {appReducers} from "@app/core/store/app.reducers";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "@env/environment";
import {UtilsModule} from "@app/core/utils/utils.module";
import {AttendanceModule} from "@app/modules/attendance/attendance.module";
import { AdminComponent } from './modules/admin/admin.component';
import { EventComponent } from './modules/event/event.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    BrowserAnimationsModule,
    NgbDropdownModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
