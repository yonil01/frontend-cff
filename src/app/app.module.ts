import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './modules/users/users.component';
import { RegisterComponent } from './modules/users/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ShowComponent } from './modules/users/show/show.component';
import {StoreModule} from "@ngrx/store";
import {appReducers} from "@app/core/store/app.reducers";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "@env/environment";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RegisterComponent,
    ShowComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
      HttpClientModule,
      StoreModule.forRoot(appReducers),
      StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
