import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Event} from "@app/core/models";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {EventService} from "@app/core/service/event/event.service";
import {AttendanceService} from "@app/core/service/attendance/attendance.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-attendance',
  templateUrl: './create-attendance.component.html',
  styleUrls: ['./create-attendance.component.scss']
})
export class CreateAttendanceComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  AttendanceFormGroup: FormGroup;
  public blockPage: boolean = false;
  public message: string = '';
  public isAlert: boolean = false;
  public listEvent: Event[] = [];
  constructor(private _formBuilder: FormBuilder, private _eventService: EventService, private _attendanceService: AttendanceService, private router: Router) {
    this.AttendanceFormGroup = this._formBuilder.group({
      id_event: [{value: '', disabled: false} ],
      date_attendance: [{value: '', disabled: false} ],
      code_student: [{value: '', disabled: false}],
    })
  }

  ngOnInit() {
    this.getEventsAll();
  }

  public eventSelect: Event | null = null;

  selectEvent(eventId: string): void {
    this.eventSelect = this.listEvent.find((event: Event) => event.id === eventId) || null;
    this.AttendanceFormGroup.get('id_event')?.setValue(this.eventSelect?.id);
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

  public saveAttendance(): void {
    if (this.AttendanceFormGroup.valid) {
      this.subscription.add(
        this._attendanceService.saveAttendance(this.AttendanceFormGroup.value).subscribe(
          (resp: any) => {
            if (resp.error) {

            } else {
              this.listEvent = resp.data;
              this.blockPage = false;
              this.router.navigate(['/admin/attendance'],);
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          }),
      );
    }


  }

}
