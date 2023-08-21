import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from "@app/core/utils/layout/layout.component";
import {RouterModule} from "@angular/router";
import {PickListModule} from "primeng/picklist";
@NgModule({
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent,
    PickListModule
  ],
  imports: [
    RouterModule,
    CommonModule,
    PickListModule

  ]
})
export class UtilsModule {
}
