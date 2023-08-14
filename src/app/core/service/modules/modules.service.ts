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
}
