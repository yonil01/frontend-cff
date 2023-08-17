import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent {
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
}
