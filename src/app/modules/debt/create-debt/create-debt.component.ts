import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-debt',
  templateUrl: './create-debt.component.html',
  styleUrls: ['./create-debt.component.scss']
})
export class CreateDebtComponent {
  DebtFormGroup: FormGroup;
  public blockPage: boolean = false;
  public message: string = '';
  public isAlert: boolean = false;
  constructor(private _formBuilder: FormBuilder,) {
    this.DebtFormGroup = this._formBuilder.group({
      code_student: [{value: '', disabled: false} ],
      activity: [{value: '', disabled: false} ],
      mount: [{value: '', disabled: false}],
    })
  }

    protected readonly location = location;
}
