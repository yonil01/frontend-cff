import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../core/service/authentication/authentication.service";
import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {AppState} from "../../core/store/app.reducers";
import {Store} from "@ngrx/store";
import {controlLogin} from "../../core/store/actions/token.action";
import {LocalStoreService} from "../../core/service/local-store/local-store.service";
import {ModulesService} from "../../core/service/modules/modules.service";
import {controlModules} from "../../core/store/actions/modules.action";
import {encryptText} from "../../core/utils/crypto/cypher";
import {Module} from "@app/core/models";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private subscription: Subscription = new Subscription();
  public formLogin: FormGroup;
  public passwordFieldType: string = 'password';
  public blockPage: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private store: Store<AppState>,
    private _localStorageService: LocalStoreService,
    private modulesService: ModulesService,
    private _route: Router,
  ) {
    this.formLogin = this._formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: [''],
    });
  }

  public login(): void {
    this.blockPage = true;
    if (this.formLogin.valid) {
      this.subscription.add(
        this._authenticationService.login(this.formLogin.value).subscribe(
          (resp: any) => {
            if (resp.error) {
            } else {
              if (resp.data.access_token !== "") {
                this._authenticationService.setTokenSessionStorage(resp.data);
                this.store.dispatch(controlLogin({logged: true}));
              } else {
                alert('Error logearse');
              }
              this.blockPage = false;
              this.isLogged();
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          }),
      );
    } else {
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  private async isLogged() {
    if (this._authenticationService.isLogged()) {
      const res = await this.getModules();
      if (typeof res === "boolean") {
        alert('No se pudo obtener los modulos asociados al usuario, intente nuevamente');
        // this.isBlock = false;
        sessionStorage.clear();
        return
      }
      const modules: Module[] = res;
      sessionStorage.setItem('Modules', encryptText(JSON.stringify(modules)));
      // @ts-ignore
      this.store.dispatch(controlModules({modules: modules}));
      if (modules.length > 0) {
        await this._route.navigateByUrl('/home');
       //  this.isBlock = false;
      } else {
        alert('No hay modulos');
        // this.isBlock = false;
        sessionStorage.clear();
      }
    } else {
     // this.isBlock = false;
    }
  }

  public getModules(): Promise<any> {
    const roles = this._localStorageService.getRoles();
    console.log(roles);
    return new Promise((res, rej) => {
      this.subscription.add(
        this.modulesService.getModulesByRole(roles, 2,).subscribe(
          (resp: any) => {
            debugger
            if (resp.error) {
              res(resp.error);
            } else {
              res(resp.data);
            }
          },
          (err: HttpErrorResponse) => {
            alert('Error');
          }
        )
      );
    });
  }

}
