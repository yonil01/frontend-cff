import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {encryptText} from "../../utils/crypto/cypher";
import {URL_AUTH, URL_API_GLOBAL} from "../../../config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStoreService} from "../local-store/local-store.service";
import {AppState} from "../../store/app.reducers";
import {Store} from "@ngrx/store";
import {controlTimeout} from "../../store/actions/token.action";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private _httpClient: HttpClient,
               private localStorageService: LocalStoreService,
               private store: Store<AppState>) {

  }
  public login(value: any): Observable<Response>{
    const url: string = URL_AUTH + '/api/v4/auth';
    const data = {
      id: encryptText(value.id),
      password: encryptText(value.password),
      client_id: 9925,
      host_name: 'hostname',
    };

    return this._httpClient.post<Response>(url, data).pipe(map((res) => res));
  }

  public setTokenSessionStorage(token: any): void {
    const {access_token, refresh_token} = token;
    sessionStorage.setItem('access-token', access_token);
    sessionStorage.setItem('refresh-token', refresh_token);
    const timeout = this.localStorageService.getSessionExp();
    this.store.dispatch(controlTimeout({timeout: timeout}));
  }

  public isLogged(): boolean {
    return !!sessionStorage.getItem('access-token');
  }

  public saveUser(data: any) {
    data.password = encryptText(data.password);
    data.password_confirm = encryptText(data.password_confirm);
    const url: string = URL_AUTH + '/api/v1/user/register';
    const httpOptions = {
      'headers': new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post(url, data, httpOptions).pipe(
      map(res => res)
    );
  }

  public updateUser(data: any) {
    data.password = encryptText(data.password);
    data.password_confirm = encryptText(data.password_confirm);
    const url: string = URL_AUTH + '/api/v1/user/update';
    const httpOptions = {
      'headers': new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post(url, data, httpOptions).pipe(
      map(res => res)
    );
  }

  public saveRole(data: any) {
    const token = this.localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/roles/create';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<Response>(url, data, { headers }).pipe(map((res) => res));

  }

  public updateRole(data: any) {
    const token = this.localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/roles/update';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<Response>(url, data, { headers }).pipe(map((res) => res));

  }

  public getRoles() {
    const token = this.localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/roles';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<Response>(url, { headers }).pipe(map((res) => res));

  }

  public CreateRoleModule(data: any) {
    const token = this.localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/roles/create';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<Response>(url, data, { headers }).pipe(map((res) => res));

  }

  public DeleteRole(id: string | undefined) {
    const token = this.localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/roles/delete/' + id;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<Response>(url, { headers }).pipe(map((res) => res));
  }

  public GetRoleById(id: string | undefined) {
    const token = this.localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/roles/' + id;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<Response>(url, { headers }).pipe(map((res) => res));
  }

}
