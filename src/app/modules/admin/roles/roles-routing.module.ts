import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RolesComponent} from "@app/modules/admin/roles/roles.component";
import {CreateRolesComponent} from "@app/modules/admin/roles/create-roles/create-roles.component";


const routes: Routes = [
  { path: '', component: RolesComponent },
  { path: 'create', component: CreateRolesComponent },
  { path: 'edit/:id', component: CreateRolesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
