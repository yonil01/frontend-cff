import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ServiceReniecService} from "../services/service-reniec/service-reniec.service";
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import {AuthenticationService} from "@app/core/service/authentication/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  ReniecFormGroup: FormGroup;
  public blockPage: boolean = false;
  public message: string = '';
  public isAlert: boolean = false;
 public passwordFieldType: string = 'password';
  constructor(private _formBuilder: FormBuilder,
             private _reniecService: ServiceReniecService,
              private _authenticationService: AuthenticationService) {

    this.ReniecFormGroup = this._formBuilder.group({
      dni: [{value: '', disabled: false} ],
      code_student: [{value: '', disabled: false} ],
      names: [{value: '', disabled: true}],
      lastname_father: [{value: '', disabled: true}],
      lastname_mother: [{value: '', disabled: true}],
      email: [{value: '', disabled: false}],
      password: [{value: '', disabled: false}],
    })
  }


  public getReniecByDni(): void {
    this.blockPage = true;
    const jsonData: any = {
      dni: this.ReniecFormGroup.get('dni')?.value,
    }
    this._reniecService.getReniecByDni(jsonData).subscribe(async (resp: any) => {

    if (resp.error) {
      this.isAlert = true;
      this.message = 'Error en el servidor';
    }

    if (resp.data.data.nombres == null) {
      this.isAlert = true;
      this.message = 'El usuario no existe!';
    }

      this.ReniecFormGroup.get('names')?.setValue(resp.data.data.nombres);
      this.ReniecFormGroup.get('lastname_father')?.setValue(resp.data.data.apellido_paterno);
      this.ReniecFormGroup.get('lastname_mother')?.setValue(resp.data.data.apellido_materno);
      this.blockPage = false;
    })
    this.isAlert = true;
    this.message = 'Consulta Exitoso!';

  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  public saveUser(): void {
    const user: any = {
      id: uuidv4(),
      username: this.ReniecFormGroup.get('dni')?.value,
      code_student: this.ReniecFormGroup.get('code_student')?.value,
      dni: this.ReniecFormGroup.get('dni')?.value,
      names: this.ReniecFormGroup.get('names')?.value,
      lastname_father: this.ReniecFormGroup.get('lastname_father')?.value,
      lastname_mother: this.ReniecFormGroup.get('lastname_mother')?.value,
      email: this.ReniecFormGroup.get('email')?.value,
      password: this.ReniecFormGroup.get('password')?.value,
      password_confirm: this.ReniecFormGroup.get('password')?.value,

    }

    this._authenticationService.saveUser(user).subscribe(async (resp: any) => {
      if (resp.error) {
        this.isAlert = true;
        this.message = 'Error en el servidor';
      }

      if (resp.data == null) {
        this.isAlert = true;
        this.message = 'El usuario no se creo!';
      }

      this.message = 'El usuario se creo correcto!';
      this.blockPage = false;
      location.reload();
    })
  }


}
