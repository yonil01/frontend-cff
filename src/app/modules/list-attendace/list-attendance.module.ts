import { NgModule } from '@angular/core';
import {CommonModule, NgClass, NgForOf, NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ListAttendanceRoutingModule } from './list-attendance-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DebtComponent} from "@app/modules/debt/debt.component";
import {UtilsModule} from "@app/core/utils/utils.module";
import {AttendanceComponent} from "@app/modules/attendance/attendance.component";
import {CreateAttendanceComponent} from "@app/modules/attendance/create-attendance/create-attendance.component";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {ListAttendaceComponent} from "@app/modules/list-attendace/list-attendace.component";
@NgModule({
  declarations: [ListAttendaceComponent],
  imports: [
    ReactiveFormsModule,
    NgIf,
    UtilsModule,
    NgForOf,
    ListAttendanceRoutingModule,
    NgbModule,
    NgClass,
    BsDatepickerModule
  ],
  providers: [],
  exports: [
  ]
})
export class ListAttendanceModule {}
