import {Component, Input, OnInit} from '@angular/core';
import {Role, RoleAllowed, User, UserRole} from "@app/core/models";
import { v4 as uuidv4 } from 'uuid';
import {AuthenticationService} from "@app/core/service/authentication/authentication.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public rolesAvailables: RoleAllowed[] = [];
  public rolesSelected: Role[] = [];
  public callServicesCount = 0;
  // @ts-ignore
  @Input() user: User;
  public usersRoles: UserRole[] = [];

  constructor(private _authenticationService: AuthenticationService) {
  }
  ngOnInit() {
  }





}
