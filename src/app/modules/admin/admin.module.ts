import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UtilsModule} from "@app/core/utils/utils.module";
import {ListAttendanceComponent} from "@app/modules/attendance/list-attendance/list-attendance.component";
import {CreateAttendanceComponent} from "@app/modules/attendance/create-attendance/create-attendance.component";
import {AdminComponent} from "@app/modules/admin/admin.component";
import {ModulesComponent} from "@app/modules/admin/modules/modules.component";
import {AttendanceModule} from "@app/modules/attendance/attendance.module";
import {ListRolesComponent} from "@app/modules/admin/roles/list-roles/list-roles.component";
@NgModule({
  declarations: [AdminComponent],
  imports: [
    ReactiveFormsModule,
    NgIf,
    UtilsModule,
    NgForOf,
    AdminRoutingModule,
    AttendanceModule
  ],
  providers: [],
  exports: [
  ]
})
export class AdminModule {}
