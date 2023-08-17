import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from "@app/modules/home/home-routing.module";
import {UtilsModule} from "@app/core/utils/utils.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UtilsModule
  ]
})
export class HomeModule {
}
