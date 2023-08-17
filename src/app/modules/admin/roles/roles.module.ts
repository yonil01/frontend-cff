import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RolesRoutingModule } from './roles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UtilsModule} from "@app/core/utils/utils.module";
import {RolesComponent} from "@app/modules/admin/roles/roles.component";
import {AttendanceModule} from "@app/modules/attendance/attendance.module";
import {ListRolesComponent} from "@app/modules/admin/roles/list-roles/list-roles.component";
import {CreateRolesComponent} from "@app/modules/admin/roles/create-roles/create-roles.component";
@NgModule({
  declarations: [RolesComponent, ListRolesComponent, CreateRolesComponent],
  imports: [
    ReactiveFormsModule,
    NgIf,
    UtilsModule,
    NgForOf,
    RolesRoutingModule,
    AttendanceModule
  ],
  providers: [],
  exports: [
  ]
})
export class RolesModule {}
