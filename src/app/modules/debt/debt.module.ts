import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DebtRoutingModule } from './debt-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListDebtComponent } from './list-debt/list-debt.component';
import { CreateDebtComponent } from './create-debt/create-debt.component';
import {DebtComponent} from "@app/modules/debt/debt.component";
import {UtilsModule} from "@app/core/utils/utils.module";
import {AttendanceModule} from "@app/modules/attendance/attendance.module";
@NgModule({
  declarations: [ ListDebtComponent, CreateDebtComponent, DebtComponent],
    imports: [
        DebtRoutingModule,
        ReactiveFormsModule,
        NgIf,
        UtilsModule,
        NgForOf,
        AttendanceModule
    ],
  providers: [
  ],
})
export class DebtModule {}
