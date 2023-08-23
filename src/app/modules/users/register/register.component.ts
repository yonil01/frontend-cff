import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ServiceReniecService} from "../services/service-reniec/service-reniec.service";
import { v4 as uuidv4 } from 'uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "@app/core/service/authentication/authentication.service";
import Stepper from "bs-stepper";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {Module, ModuleRole, RoleModel, User, UserRole} from "@app/core/models";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  private subscription: Subscription = new Subscription();
  private user: any;
  // @ts-ignore
  private stepper: Stepper;
  ReniecFormGroup: FormGroup;
  public blockPage: boolean = false;
  public message: string = '';
  public isAlert: boolean = false;
 public passwordFieldType: string = 'password';
  public modulesAvailables: any[] = [];
  public modulesSelected: any[] = [];
  public callServicesCount = 0;
  public roleUsers: UserRole[] = [];
  constructor(private _formBuilder: FormBuilder,
             private _reniecService: ServiceReniecService,
              private _authenticationService: AuthenticationService,
              private _route: ActivatedRoute) {

    this.ReniecFormGroup = this._formBuilder.group({
      dni: [{value: '', disabled: false} ],
      code_student: [{value: '', disabled: false} ],
      names: [{value: '', disabled: true}],
      lastname_father: [{value: '', disabled: true}],
      lastname_mother: [{value: '', disabled: true}],
      email: [{value: '', disabled: false}],
    })
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.getUserById(id);
    }

    // @ts-ignore
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }
  onSubmit() {
    return false;
  }

  backStep() {
    this.stepper.previous();
  }



  public getReniecByDni(): void {
    this.blockPage = true;
    const jsonData: any = {
      dni: this.ReniecFormGroup.get('dni')?.value,
    }
    this._reniecService.getReniecByDni(jsonData).subscribe(async (resp: any) => {
      debugger
    if (resp.error) {
      this.isAlert = true;
      this.message = 'Error en el servidor';
    }

    if (resp.data.nombres == null) {
      this.isAlert = true;
      this.message = 'El usuario no existe!';
    }

      this.ReniecFormGroup.get('names')?.setValue(resp.data.nombres);
      this.ReniecFormGroup.get('lastname_father')?.setValue(resp.data.apellidoPaterno);
      this.ReniecFormGroup.get('lastname_mother')?.setValue(resp.data.apellidoMaterno);
      this.blockPage = false;
    })
    this.isAlert = true;
    this.message = 'Consulta Exitoso!';

  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  public saveUser(): void {
    if (this.ReniecFormGroup.valid) {
      if(this.user) {
        const user: any = {
          id: this.user.id,
          username: this.ReniecFormGroup.get('email')?.value,
          code_student: this.ReniecFormGroup.get('code_student')?.value,
          dni: this.ReniecFormGroup.get('dni')?.value,
          names: this.ReniecFormGroup.get('names')?.value,
          lastname_father: this.ReniecFormGroup.get('lastname_father')?.value,
          lastname_mother: this.ReniecFormGroup.get('lastname_mother')?.value,
          email: this.ReniecFormGroup.get('email')?.value,
          password: this.ReniecFormGroup.get('dni')?.value,
          password_confirm: this.ReniecFormGroup.get('dni')?.value,

        }

        this._authenticationService.updateUser(user).subscribe(async (resp: any) => {
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
          this.stepper.next();
        })
      }

      } else {
        const user: any = {
          id: uuidv4(),
          username: this.ReniecFormGroup.get('email')?.value,
          code_student: this.ReniecFormGroup.get('code_student')?.value,
          dni: this.ReniecFormGroup.get('dni')?.value,
          names: this.ReniecFormGroup.get('names')?.value,
          lastname_father: this.ReniecFormGroup.get('lastname_father')?.value,
          lastname_mother: this.ReniecFormGroup.get('lastname_mother')?.value,
          email: this.ReniecFormGroup.get('email')?.value,
          password: this.ReniecFormGroup.get('dni')?.value,
          password_confirm: this.ReniecFormGroup.get('dni')?.value,

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
          this.stepper.next();
        })
      }

  }


  private getUserById(id: string): void {
    this.subscription.add(
      this._reniecService.getUserById(id).subscribe(
        (resp: any) => {
          if (resp.error) {
            alert("Error")
          } else {
            this.user = resp.data;
            this.setValueUser(this.user);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }),
    );
  }

  private setValueUser(user: any): void {
    this.ReniecFormGroup.get('id')?.setValue(user.id);
      this.ReniecFormGroup.get('dni')?.setValue(user.dni);
      this.ReniecFormGroup.get('code_student')?.setValue(user.code_student);
      this.ReniecFormGroup.get('dni')?.setValue(user.dni);
      this.ReniecFormGroup.get('names')?.setValue(user.names);
      this.ReniecFormGroup.get('lastname_father')?.setValue(user.lastname_father);
      this.ReniecFormGroup.get('lastname_mother')?.setValue(user.lastname_mother);
      this.ReniecFormGroup.get('email')?.setValue(user.email);
  }

  onMoveToSelected(roles: RoleModel[]): void {
    debugger
    //this.isBlockPage = true;
    this.callServicesCount = 0;
    for (const role of roles) {
      const userRole: UserRole = {
        id: uuidv4().toLowerCase(),
        user_id: this.user.id?.toLowerCase(),
        role_id: role?.id!.toLowerCase(),
      };
      this.callServicesCount++;
      this._reniecService.createRoleUser(userRole).subscribe((res: any) => {
        //this.isBlockPage = false;
        this.callServicesCount--;
        //this.isBlockPage = true;
        if (res.error) {
          alert("Error")
        } else {
          this.getRolesUser();
        }
      });
    }
  }


  onMoveToAvailable(roles: RoleModel[]): void {
    debugger
    //this.isBlockPage = true;
    this.callServicesCount = 0;
    for (const role of roles) {
      const roleUser = this.roleUsers.find(mod => mod.role_id === role.id);
      this.callServicesCount++;
      // @ts-ignore
      this._reniecService.deleteRolesUserById(roleUser?.id!.toLowerCase()).subscribe((res: any) => {
        // this.isBlockPage = false;
        this.callServicesCount--;
        if (res.error) {

        } else {
          // @ts-ignore
          this.modulesRole = this.modulesRole.filter((modUs:ModuleRole) => modUs.id !== moduleRole.id);
          this.getRolesUser();
        }
      });
    }

  }

  public getRolesUser(): Promise<any> {
    return new Promise((res, rej) => {
      this.subscription.add(
        this._reniecService.getRolesUserByUser(this.user.id).subscribe(
          (resp: any) => {
            debugger
            if (resp.error) {
              res(resp.error);
            } else {
              if (resp.data) {
                this.roleUsers = resp.data;
              }
              this.getRoles();
            }
          },
          (err: HttpErrorResponse) => {
            alert('Error');
          }
        )
      );
    });

  }

  private getRoles(): void {
    this.subscription.add(
      this._authenticationService.getRoles().subscribe(
        (resp: any) => {
          if (resp.error) {

          } else {
            if (resp.data) {
              if (this.roleUsers.length) {
                this.modulesSelected = resp.data.filter((mod: any) => {
                  return this.roleUsers.find((modUs: UserRole) => modUs.role_id === mod.id);
                });
              }
              this.modulesAvailables = resp.data.filter((mod: any) => {
                return !this.modulesSelected.some((mod2: any) => mod2.id === mod.id);
              });
            }
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }),
    );
  }

}
