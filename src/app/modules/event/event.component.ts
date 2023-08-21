import {Component, OnInit} from '@angular/core';
import {Event} from "@app/core/models";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {EventService} from "@app/core/service/event/event.service";
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public listEvent: Event[] = [];
  public blockPage: boolean = false;

  constructor(private _eventService: EventService, ) {
  }
  ngOnInit() {
    this.getEventsAll();
  }



  private getEventsAll(): void {
    this.subscription.add(
      this._eventService.getEventsAll().subscribe(
        (resp: any) => {
          if (resp.error) {

          } else {
            this.listEvent = resp.data;
            this.blockPage = false;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }),
    );
  }
}
