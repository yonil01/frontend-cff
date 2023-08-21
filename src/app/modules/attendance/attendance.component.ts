import {Component, OnInit} from '@angular/core';
import {EventService} from "@app/core/service/event/event.service";
import {ReportService} from "@app/core/service/report/report.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {Event} from "@app/core/models";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public listAttendance: any[] = [];
  public blockPage: boolean = false;
  public listEvent: Event[] = [];
  public listPromotion: any[] = [
    {
      id: 1,
      name: '2018',
      value: '2018'
    },
    {
      id: 2,
      name: '2019',
      value: '2019'
    },
    {
      id: 3,
      name: '2020',
      value: '2020'
    },
    {
      id: 4,
      name: '2021',
      value: '2021'
    },
    {
      id: 5,
      name: '2022',
      value: '2022'
    },
    {
      id: 6,
      name: '2023',
      value: '2023'
    }
  ];
  AttendanceFilterFormGroup: FormGroup;

  constructor(private _reportService: ReportService, private _eventService: EventService, private _formBuilder: FormBuilder,) {
    this.AttendanceFilterFormGroup = this._formBuilder.group({
      date_attendance: [{value: '', disabled: false} ],
      event: [{value: '', disabled: false} ],
      promotion: [{value: '', disabled: false}],
    })
  }
  ngOnInit() {
    this.getEventsAll();
  }

  public promotionSelect: any | null = null;

  selectPromotion(promotionId: number): void {
    this.promotionSelect = this.listPromotion.find((promotion: any) => promotion.id === promotionId) || null;
    this.AttendanceFilterFormGroup.get('promotion')?.setValue(this.promotionSelect?.value);
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

    const infoReportAttendance: any = {
      procedure: 'dbo.get_report_attendance',
      parameters: {
        event_id: this.eventSelect?.id,
        date_attendance: this.getDateFormat(this.AttendanceFilterFormGroup.get('date_attendance')?.value),
        promotion: this.AttendanceFilterFormGroup.get('promotion')?.value
      }
    }

    this.subscription.add(
      this._reportService.GetInfoReport(infoReportAttendance).subscribe(
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
