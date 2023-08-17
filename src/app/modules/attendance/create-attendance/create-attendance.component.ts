import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-attendance',
  templateUrl: './create-attendance.component.html',
  styleUrls: ['./create-attendance.component.scss']
})
export class CreateAttendanceComponent {
  AttendanceFormGroup: FormGroup;
  public blockPage: boolean = false;
  public message: string = '';
  public isAlert: boolean = false;
  constructor(private _formBuilder: FormBuilder,) {
    this.AttendanceFormGroup = this._formBuilder.group({
      date_attendance: [{value: '', disabled: false} ],
      category: [{value: '', disabled: false} ],
      promotion: [{value: '', disabled: false}],
    })
  }

    protected readonly location = location;
}
