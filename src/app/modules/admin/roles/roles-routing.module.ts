import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RolesComponent} from "@app/modules/admin/roles/roles.component";


const routes: Routes = [
  { path: '', component: RolesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}