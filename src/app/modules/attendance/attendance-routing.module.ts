import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AttendanceComponent} from "@app/modules/attendance/attendance.component";
import {CreateAttendanceComponent} from "@app/modules/attendance/create-attendance/create-attendance.component";


const routes: Routes = [
  { path: '', component: AttendanceComponent },
  { path: 'create', component: CreateAttendanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {}
