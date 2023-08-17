import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InventaryComponent} from "@app/modules/inventary/inventary.component";


const routes: Routes = [
  { path: '', component: InventaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventaryRoutingModule {}
