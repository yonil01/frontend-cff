import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UtilsModule} from "@app/core/utils/utils.module";
import {AdminComponent} from "@app/modules/admin/admin.component";
import {AttendanceModule} from "@app/modules/attendance/attendance.module";

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
