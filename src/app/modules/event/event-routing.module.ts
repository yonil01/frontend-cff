import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventComponent} from "@app/modules/event/event.component";
import {CreateEventComponent} from "@app/modules/event/create-event/create-event.component";


const routes: Routes = [
  { path: '', component: EventComponent },
  { path: 'create', component: CreateEventComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
