import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-inventary',
  templateUrl: './create-inventary.component.html',
  styleUrls: ['./create-inventary.component.scss']
})
export class CreateInventaryComponent {
  InventoryFormGroup: FormGroup;
  public blockPage: boolean = false;
  public message: string = '';
  public isAlert: boolean = false;
  constructor(private _formBuilder: FormBuilder,) {
    this.InventoryFormGroup = this._formBuilder.group({
      name: [{value: '', disabled: false} ],
      description: [{value: '', disabled: false} ],
      count: [{value: '', disabled: false}],
      status: [{value: '', disabled: false}],
    })
  }

    protected readonly location = location;
}
