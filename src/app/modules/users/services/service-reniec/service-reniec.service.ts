import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {URL_API_GLOBAL, URL_AUTH} from "@app/config";
import {LocalStoreService} from "@app/core/service/local-store/local-store.service";
import {UserRole} from "@app/core/models";

@Injectable({
  providedIn: 'root'
})
export class ServiceReniecService {

  constructor(private _httpClient: HttpClient, private localStorageService: LocalStoreService,) { }
  public getReniecByDni(data: any) {
    //  let token = sessionStorage.getItem('token');

    const url: string = URL_API_GLOBAL + '/api/v1/reniec/dni';
    const httpOptions = {
      'headers': new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post(url, data, httpOptions).pipe(
      map(res => res)
    );
  }



  public getUsers() {
    //  let token = sessionStorage.getItem('token');

    const url: string = URL_API_GLOBAL + '/api/v1/users/all';
    const httpOptions = {
      'headers': new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.get(url, httpOptions).pipe(
      map(res => res)
    );
  }

  deleteUsers(id: string) {
    //  let token = sessionStorage.getItem('token');

    const url: string = URL_API_GLOBAL + '/api/v1/users/delete/' + id;
    const httpOptions = {
      'headers': new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.get(url, httpOptions).pipe(
      map(res => res)
    );
  }

  getUserById(id: string) {
    //  let token = sessionStorage.getItem('token');

    const url: string = URL_API_GLOBAL + '/api/v1/users/' + id;
    const httpOptions = {
      'headers': new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.get(url, httpOptions).pipe(
      map(res => res)
    );
  }

  createRoleUser(data: UserRole): Observable<Response> {
    const token = this.localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/role_user/create';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.post<Response>(url, data, { headers }).pipe(map((res) => res));
  }


  public getRolesUserByUser(idUser: string): Observable<Response> {
    const token = this.localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/role_user/all/' + idUser;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.get<Response>(url, { headers }).pipe(map((res) => res));
  }

  public deleteRolesUserById(id: string): Observable<Response> {
    const token = this.localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/role_user/delete/' + id;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.get<Response>(url, { headers }).pipe(map((res) => res));
  }
}
