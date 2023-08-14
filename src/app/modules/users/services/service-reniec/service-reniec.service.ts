import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";
import {URL_API_GLOBAL} from "@app/config";

@Injectable({
  providedIn: 'root'
})
export class ServiceReniecService {

  constructor(private _httpClient: HttpClient,) { }
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

  public saveUser(data: any) {
    //  let token = sessionStorage.getItem('token');

    const url: string = URL_API_GLOBAL + '/api/v1/users/create';
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
}
