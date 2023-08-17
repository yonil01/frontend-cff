import { Component } from '@angular/core';
import {AdminComponent} from "@app/modules/admin/admin.component";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  public isCreate: boolean = false;
}
