import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "@app/core/service/authentication/authentication.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {Role, RoleAllowed, RoleModel, User, UserRole} from "@app/core/models";
import { v4 as uuidv4 } from 'uuid';
import {Router} from "@angular/router";
import Stepper from "bs-stepper";

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {

  name = 'Angular';
  // @ts-ignore
  private stepper: Stepper;


  onSubmit() {
    return false;
  }

  private subscription: Subscription = new Subscription();
  RolesFormGroup: FormGroup;
  public blockPage: boolean = false;
  public message: string = '';
  public isAlert: boolean = false;
  public rolesAvailables: any[] = [];
  public rolesSelected: Role[] = [];
  public callServicesCount = 0;
  // @ts-ignore
  public role: Role;
  public usersRoles: UserRole[] = [];
  constructor(private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService,  private router: Router) {
    this.RolesFormGroup = this._formBuilder.group({
      name: [{value: '', disabled: false} ],
      description: [{value: '', disabled: false} ],
    })
  }

  ngOnInit() {
    // @ts-ignore
    this.getRoles();
    // @ts-ignore
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  onMoveToSelected(roles: RoleAllowed[]): void {
    //this.isBlockPage = true;
    this.callServicesCount = 0;
    for (const role of roles) {
      const userRole: UserRole = {
        id: uuidv4().toLowerCase(),
        user_id: this.role.id?.toLowerCase(),
        role_id: role.role_allow?.id!.toLowerCase(),
      };
      this.callServicesCount++;
      this._authenticationService.CreateRoleModule(userRole).subscribe((res: any) => {
        //this.isBlockPage = false;
        this.callServicesCount--;
        //this.isBlockPage = true;
        if (res.error) {

        } else {

        }
        // this.getUsersRolesByUserID();
      });
    }
  }


  onMoveToAvailable(roles: RoleAllowed[]): void {
    //this.isBlockPage = true;
    this.callServicesCount = 0;
    for (const role of roles) {
      const userRole: UserRole = this.usersRoles.find((ur) =>
        ur.user_id?.toLowerCase() === this.role.id?.toLowerCase() &&
        ur.role_id?.toLowerCase() === role.role_allow?.id!.toLowerCase(),
      )!;
      this.callServicesCount++;
      this._authenticationService.DeleteRoleModule(userRole?.id!.toLowerCase()).subscribe((res: any) => {
        // this.isBlockPage = false;
        this.callServicesCount--;
        if (res.error) {

        } else {

        }
        // this.getUsersRolesByUserID();
      });
    }

  }
  public saveRole(): void {
    if (this.RolesFormGroup.valid) {

      const newRole: RoleModel = {
        id: uuidv4(),
        name: this.RolesFormGroup.get('name')?.value,
        description: this.RolesFormGroup.get('description')?.value,
      }
      this.subscription.add(
        this._authenticationService.saveRole(newRole).subscribe(
          (resp: any) => {
            debugger
            if (resp.error) {
            } else {
              this.blockPage = false;
              this.stepper.next();
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          }),
      );
    }
  }

  private getRoles(): void {

    this.subscription.add(
      this._authenticationService.getRoles().subscribe(
        (resp: any) => {
          debugger
          if (resp.error) {

          } else {
            this.rolesAvailables = resp.data;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }),
    );
  }


  protected readonly location = location;
}
