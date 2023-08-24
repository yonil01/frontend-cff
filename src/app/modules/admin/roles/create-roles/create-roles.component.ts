import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "@app/core/service/authentication/authentication.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {Module, ModuleRole, Role, RoleAllowed, RoleModel, User, UserRole} from "@app/core/models";
import { v4 as uuidv4 } from 'uuid';
import {ActivatedRoute, Router} from "@angular/router";
import Stepper from "bs-stepper";
import {ModulesService} from "@app/core/service/modules/modules.service";
import {RolesModule} from "@app/modules/admin/roles/roles.module";

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
  public modulesAvailables: any[] = [];
  public modulesSelected: any[] = [];
  public callServicesCount = 0;
  // @ts-ignore
  public role: Role;
  public modulesRole: ModuleRole[] = [];
  constructor(private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService,
              private router: Router,
              private _modulesService: ModulesService,
              private _route: ActivatedRoute) {
    this.RolesFormGroup = this._formBuilder.group({
      name: [{value: '', disabled: false} ],
      description: [{value: '', disabled: false} ],
    })
  }

  ngOnInit() {

    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.getRoleById(id);
    }
    // @ts-ignore
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  backStep() {
    this.stepper.previous();
  }

  onMoveToSelected(modules: Module[]): void {
    //this.isBlockPage = true;
    this.callServicesCount = 0;
    for (const module of modules) {
      const userRole: ModuleRole = {
        id: uuidv4().toLowerCase(),
        role_id: this.role.id?.toLowerCase(),
        element_id: module?.id!.toLowerCase(),
      };
      this.callServicesCount++;
      this._modulesService.CreateModuleRole(userRole).subscribe((res: any) => {
        //this.isBlockPage = false;
        this.callServicesCount--;
        //this.isBlockPage = true;
        if (res.error) {
          alert("Error")
        } else {
          this.getModulesRoles();
        }
      });
    }
  }


  onMoveToAvailable(modules: Module[]): void {
    //this.isBlockPage = true;
    this.callServicesCount = 0;
    for (const module of modules) {
      const moduleRole = this.modulesRole.find(mod => mod.element_id === module.id);
      this.callServicesCount++;
      // @ts-ignore
      this._modulesService.deleteModulesRole(moduleRole?.id!.toLowerCase()).subscribe((res: any) => {
        // this.isBlockPage = false;
        this.callServicesCount--;
        if (res.error) {

        } else {
          // @ts-ignore
          this.modulesRole = this.modulesRole.filter((modUs:ModuleRole) => modUs.id !== moduleRole.id);
          this.getModulesRoles();
        }
      });
    }

  }
  public saveRole(): void {
    if (this.role) {
      const role: RoleModel = {
        id: this.role.id,
        name: this.RolesFormGroup.get('name')?.value,
        description: this.RolesFormGroup.get('description')?.value,
      }
      this.subscription.add(
        this._authenticationService.updateRole(role).subscribe(
          (resp: any) => {
            if (resp.error) {
            } else {
              this.role = resp.data;
              this.blockPage = false;
              this.stepper.next();
              this.getModulesRoles();
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          }),
      );
    } else {
      if (this.RolesFormGroup.valid) {
        const role: RoleModel = {
          id: uuidv4(),
          name: this.RolesFormGroup.get('name')?.value,
          description: this.RolesFormGroup.get('description')?.value,
        }
        this.subscription.add(
          this._authenticationService.saveRole(role).subscribe(
            (resp: any) => {
              if (resp.error) {
              } else {
                this.role = resp.data;
                this.blockPage = false;
                this.stepper.next();
                this.getModulesRoles();
              }
            },
            (err: HttpErrorResponse) => {
              console.log(err);
            }),
        );
      }
    }
  }

  private getModules(): void {
    this.subscription.add(
      this._modulesService.getModules().subscribe(
        (resp: any) => {
          if (resp.error) {

          } else {
            if (resp.data) {
              if (this.modulesRole.length) {
                this.modulesSelected = resp.data.filter((mod: any) => {
                  return this.modulesRole.find((modUs: ModuleRole) => modUs.element_id === mod.id);
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

  public getModulesRoles(): Promise<any> {
      return new Promise((res, rej) => {
        this.subscription.add(
          this._modulesService.getModulesRole(this.role.id).subscribe(
            (resp: any) => {
              if (resp.error) {
                res(resp.error);
              } else {
                if (resp.data) {
                  this.modulesRole = resp.data;
                }
                this.getModules();
              }
            },
            (err: HttpErrorResponse) => {
              alert('Error');
            }
          )
        );
      });

  }
  private getRoleById(id: string): void {
    this.subscription.add(
      this._authenticationService.GetRoleById(id).subscribe(
        (resp: any) => {
          if (resp.error) {
            alert("Error")
          } else {
            this.role = resp.data;
            this.RolesFormGroup.get('name')?.setValue(this.role.name);
            this.RolesFormGroup.get('description')?.setValue(this.role.description);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }),
    );
  }
}
