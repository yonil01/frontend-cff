import { Injectable } from '@angular/core';
import {Event} from "@app/core/models";
import {map, Observable} from "rxjs";
import {URL_API_GLOBAL} from "@app/config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStoreService} from "@app/core/service/local-store/local-store.service";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _localStorageService: LocalStoreService, private _httpClient: HttpClient,) { }

  public GetInfoReport(report: any): Observable<Response> {
    const token = this._localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/report';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<Response>(url, report, { headers }).pipe(map((res) => res));

  }
}
