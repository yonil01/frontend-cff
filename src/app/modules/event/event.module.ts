import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UtilsModule} from "@app/core/utils/utils.module";
import {EventComponent} from "@app/modules/event/event.component";
import { CreateEventComponent } from './create-event/create-event.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {defineLocale, esLocale} from "ngx-bootstrap/chronos";

defineLocale('es', esLocale);
@NgModule({
  declarations: [EventComponent, CreateEventComponent],
  imports: [
    ReactiveFormsModule,
    NgIf,
    UtilsModule,
    NgForOf,
    CommonModule,
    EventRoutingModule,
    // Agrega el módulo BsDatepickerModule
    BsDatepickerModule.forRoot(),
  ],
  providers: [
  ],
})
export class EventModule {}
