import {Component, OnInit} from '@angular/core';
import {ServiceReniecService} from "@app/modules/users/services/service-reniec/service-reniec.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  public users: any = [];

  constructor(
    private _reniecService: ServiceReniecService,) {

  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {


    this._reniecService.getUsers().subscribe(async (resp: any) => {
      if (resp.error) {
        alert('Error');
      }

      this.users = resp.data;

    })
  }

  deleteUser(user: any) {
    this._reniecService.deleteUsers(user.id).subscribe(async (resp: any) => {
      if (resp.error) {
        alert('Error');
      }
      this.users = resp.data;
      this.getUsers();

    })
  }

}
