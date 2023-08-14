import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {encryptText} from "../../utils/crypto/cypher";
import {URL_AUTH, URL_API_GLOBAL} from "../../../config";
import {HttpClient} from "@angular/common/http";
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


}
