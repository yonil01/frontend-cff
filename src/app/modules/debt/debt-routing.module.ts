import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DebtComponent} from "@app/modules/debt/debt.component";


const routes: Routes = [
  { path: '', component: DebtComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebtRoutingModule {}
