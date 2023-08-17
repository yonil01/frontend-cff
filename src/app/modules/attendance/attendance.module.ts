import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DebtComponent} from "@app/modules/debt/debt.component";
import {UtilsModule} from "@app/core/utils/utils.module";
import {AttendanceComponent} from "@app/modules/attendance/attendance.component";
import {ListAttendanceComponent} from "@app/modules/attendance/list-attendance/list-attendance.component";
import {CreateAttendanceComponent} from "@app/modules/attendance/create-attendance/create-attendance.component";
@NgModule({
  declarations: [AttendanceComponent, ListAttendanceComponent, CreateAttendanceComponent],
  imports: [
    ReactiveFormsModule,
    NgIf,
    UtilsModule,
    NgForOf,
    AttendanceRoutingModule
  ],
  providers: [],
  exports: [
    CreateAttendanceComponent,
    ListAttendanceComponent
  ]
})
export class AttendanceModule {}
