import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ServiceReniecService} from "../services/service-reniec/service-reniec.service";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit{
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
