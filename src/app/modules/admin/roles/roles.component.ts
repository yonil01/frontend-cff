import {Component, OnInit} from '@angular/core';
import {AdminComponent} from "@app/modules/admin/admin.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {AuthenticationService} from "@app/core/service/authentication/authentication.service";
import {ModuleRole, RoleModel} from "@app/core/models";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public isCreate: boolean = false;
  public listRoles: any[] = [];

  constructor(private _authenticationService: AuthenticationService) {

  }


  ngOnInit() {
    this.getRoles();
  }

  private getRoles(): void {

    this.subscription.add(
      this._authenticationService.getRoles().subscribe(
        (resp: any) => {
          if (resp.error) {

          } else {
            this.listRoles = resp.data;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }),
    );
  }

  public deleteRole(role: RoleModel): void {
    this.subscription.add(
      this._authenticationService.DeleteRole(role.id).subscribe(
        (resp: any) => {
          if (resp.error) {

          } else {
            this.listRoles = this.listRoles.filter((roleM:RoleModel) => roleM.id !== role.id);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }),
    );
  }
}
