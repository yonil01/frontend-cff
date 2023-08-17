import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { InventaryRoutingModule } from './inventary-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DebtComponent} from "@app/modules/debt/debt.component";
import {UtilsModule} from "@app/core/utils/utils.module";
import {InventaryComponent} from "@app/modules/inventary/inventary.component";
import { ListInventaryComponent } from './list-inventary/list-inventary.component';
import {CreateInventaryComponent} from "@app/modules/inventary/create-inventary/create-inventary.component";
@NgModule({
  declarations: [ InventaryComponent, ListInventaryComponent, CreateInventaryComponent],
  imports: [
    ReactiveFormsModule,
    NgIf,
    UtilsModule,
    NgForOf,
    InventaryRoutingModule
  ],
  providers: [
  ],
})
export class InventaryModule {}
