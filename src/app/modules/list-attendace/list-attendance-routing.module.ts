import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListAttendaceComponent} from "@app/modules/list-attendace/list-attendace.component";
const routes: Routes = [
  { path: '', component: ListAttendaceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAttendanceRoutingModule {}
