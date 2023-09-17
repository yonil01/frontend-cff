import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {Event} from "@app/core/models";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReportService} from "@app/core/service/report/report.service";
import {EventService} from "@app/core/service/event/event.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AttendanceService} from "@app/core/service/attendance/attendance.service";

@Component({
  selector: 'app-list-attendace',
  templateUrl: './list-attendace.component.html',
  styleUrls: ['./list-attendace.component.scss']
})
export class ListAttendaceComponent {
  private subscription: Subscription = new Subscription();
  public listAttendance: any[] = [];
  public blockPage: boolean = false;
  public listEvent: Event[] = [];

  AttendanceFilterFormGroup: FormGroup;

  constructor(private _reportService: ReportService, private _eventService: EventService, private _formBuilder: FormBuilder,
              private _attendanceService: AttendanceService) {
    this.AttendanceFilterFormGroup = this._formBuilder.group({
      date_attendance: [{value: '', disabled: false} ],
      event: [{value: '', disabled: false} ],
      promotion: [{value: '', disabled: false}],
    })
  }
  ngOnInit() {
    this.getEventsAll();
    this.getInfoAttendance();
  }

  public eventSelect: Event | null = null;

  selectEvent(eventId: string): void {
    this.eventSelect = this.listEvent.find((event: Event) => event.id === eventId) || null;
    this.AttendanceFilterFormGroup.get('event')?.setValue(this.eventSelect?.id);
  }

  public getDateFormat(dateString: string): string {
    if (dateString == '') {
      return '';
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  public getInfoAttendance(): void {
    this.blockPage = true;
    this.subscription.add(
      this._attendanceService.GetAttendance().subscribe(
        (resp: any) => {
          if (resp.error) {

          } else {
            this.listAttendance = resp.data;
            this.blockPage = false;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }),
    );
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
