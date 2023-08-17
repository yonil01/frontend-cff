import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ModulesRoutingModule } from './modules-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UtilsModule} from "@app/core/utils/utils.module";
import {RolesComponent} from "@app/modules/admin/roles/roles.component";
import {AttendanceModule} from "@app/modules/attendance/attendance.module";
import {ModulesComponent} from "@app/modules/admin/modules/modules.component";
import {ListModulesComponent} from "@app/modules/admin/modules/list-modules/list-modules.component";
import {CreateModulesComponent} from "@app/modules/admin/modules/create-modules/create-modules.component";
@NgModule({
  declarations: [ModulesComponent, ListModulesComponent, CreateModulesComponent],
  imports: [
    ReactiveFormsModule,
    NgIf,

    NgForOf,
    ModulesRoutingModule,
    UtilsModule,
  ],
  providers: [],
  exports: [
  ]
})
export class ModulesModule {}
