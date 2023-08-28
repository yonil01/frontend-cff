import {Component, OnInit} from '@angular/core';
import {ServiceReniecService} from "@app/modules/users/services/service-reniec/service-reniec.service";
import * as XLSX from 'xlsx';
import {User, UserRole} from "@app/core/models";
type AOA = any[][];
import { v4 as uuidv4 } from 'uuid';
import {AuthenticationService} from "@app/core/service/authentication/authentication.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  public users: any = [];
  data: AOA = [[1, 2], [3, 4]];

  constructor(
    private _reniecService: ServiceReniecService, private _authenticationService: AuthenticationService,) {

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

  public onFileExcel(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.createUserOfFile(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  public async createUserOfFile(data: any[]) {
    // this.showLoader[0].value = true;
    const ArrayUser: User[] = []
    const ArrayRoles: any[] = [];
    if (data.length) {
      data.forEach((us: any, index: number) => {
        if (index !== 0 && us.length) {

          const newUser: any = {
            id: uuidv4().toLowerCase(),
            username: us[5].toString(),
            code_student: us[1].toString(),
            dni: us[0].toString(),
            names: us[2].toString(),
            lastname_father: us[3].toString(),
            lastname_mother: us[4].toString(),
            email: us[5].toString(),
            password: us[0].toString(),
            password_confirm: us[0].toString(),
            roles: us[6]?.split(',')
          }
          ArrayUser.push(newUser);
        }
      })
      await Promise.all(ArrayUser).then((users: User[]) => {
        users.forEach((user: User) => {
          this._authenticationService.saveUser(user).subscribe(async (resp: any) => {

            if (resp.error) {
              alert('Error');
            }

            if (resp.data == null) {

            }

            // @ts-ignore
            await Promise.all(user.roles).then((roles: string[]) => {

              roles.forEach((rol: string) => {
                const NameRole: any = {
                  name: rol,
                }
                this._reniecService.getRoleByName(NameRole).subscribe((res: any) => {

                  if (res.error) {
                    alert("Error")
                  } else {
                    const userRole: UserRole = {
                      id: uuidv4().toLowerCase(),
                      user_id: user.id?.toLowerCase(),
                      role_id: res.data?.id!.toLowerCase(),
                    };
                    this._reniecService.createRoleUser(userRole).subscribe((res: any) => {

                      if (res.error) {
                        alert("Error")
                      } else {
                        this.getUsers();
                      }
                    });
                  }
                });
              });
            });
          });

            })

      })
    }
  }

}
