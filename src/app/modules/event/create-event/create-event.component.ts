import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import {Event} from "@app/core/models";
import {EventService} from "@app/core/service/event/event.service";
import {controlLogin} from "@app/core/store/actions/token.action";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {

  private subscription: Subscription = new Subscription();
  EventFormGroup: FormGroup;
  public blockPage: boolean = false;
  public message: string = '';
  public isAlert: boolean = false;
  minDate: Date;
  myDateValue: Date;

  constructor(private _formBuilder: FormBuilder, private _eventService: EventService, private router: Router) {
    this.EventFormGroup = this._formBuilder.group({
      name: [{value: '', disabled: false} ],
      description: [{value: '', disabled: false} ],
      event_date: [{value: '', disabled: false}],
    })
    // Define las fechas mínima y máxima permitidas
    this.minDate = new Date(); // Fecha actual
    this.myDateValue = new Date();
  }

  public saveEvent() {
    if (this.EventFormGroup.valid) {
        const newEvent: Event = {
          id: uuidv4(),
          name: this.EventFormGroup.get('name')?.value,
          description: this.EventFormGroup.get('description')?.value,
          event_date: this.EventFormGroup.get('event_date')?.value,
        }


      this.subscription.add(
        this._eventService.saveEvent(newEvent).subscribe(
          (resp: any) => {
            if (resp.error) {

            } else {
              this.blockPage = false;
              this.router.navigate(['/admin/events'],);
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          }),
      );
    }
  }
}
