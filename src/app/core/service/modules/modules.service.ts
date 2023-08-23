import { Injectable } from '@angular/core';
import {URL_API_GLOBAL, URL_AUTH} from "../../../config";
import {encryptText} from "../../utils/crypto/cypher";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStoreService} from "@app/core/service/local-store/local-store.service";

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStoreService
  ) { }

  getModulesByRole(ids: string[], type: number): Observable<Response> {
    const token = this._localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/modules/user';
    const data = {
      ids: ids,
      type: type,
    };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.post<Response>(url, data, { headers }).pipe(map((res) => res));
  }

  getModules(): Observable<Response> {
    const token = this._localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/modules';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.get<Response>(url, { headers }).pipe(map((res) => res));
  }

  getModulesRole(roleId: string): Observable<Response> {
    const token = this._localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/modules/role/' + roleId;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.get<Response>(url, { headers }).pipe(map((res) => res));
  }

  deleteModulesRole(moduleRoleId: string): Observable<Response> {
    const token = this._localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/modules/role/delete/' + moduleRoleId;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.get<Response>(url, { headers }).pipe(map((res) => res));
  }

  public CreateModuleRole(data: any) {
    const token = this._localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/modules/role/create';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.post<Response>(url, data,{ headers }).pipe(map((res) => res));
  }
}
