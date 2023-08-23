import {Component, OnInit} from '@angular/core';
import {Module, ModuleRole} from "@app/core/models";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "@app/core/service/authentication/authentication.service";
import {Subscription} from "rxjs";
import {ModulesService} from "@app/core/service/modules/modules.service";

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent  implements OnInit {
  public listModules: Module[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private _modulesService: ModulesService,) {
  }

  ngOnInit() {
    this.getModules();
  }

  private getModules(): void {
    this.subscription.add(
      this._modulesService.getModules().subscribe(
        (resp: any) => {
          debugger
          if (resp.error) {

          } else {
            if (resp.data) {
                this.listModules = resp.data;
              }
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }),
    );
  }
}
