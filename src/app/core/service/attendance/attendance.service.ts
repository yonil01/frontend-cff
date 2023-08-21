import { Injectable } from '@angular/core';
import {URL_API_GLOBAL} from "@app/config";
import {Event} from "@app/core/models";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStoreService} from "@app/core/service/local-store/local-store.service";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(private _localStorageService: LocalStoreService, private _httpClient: HttpClient,) { }

  public saveAttendance(attendance: any): Observable<Response> {
    const token = this._localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/attendance/create';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<Response>(url, attendance, { headers }).pipe(map((res) => res));

  }

}
