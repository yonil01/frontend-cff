import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {appReducers} from "@app/core/store/app.reducers";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "@env/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
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
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
