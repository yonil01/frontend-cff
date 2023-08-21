import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {URL_API_GLOBAL} from "@app/config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStoreService} from "@app/core/service/local-store/local-store.service";
import {Event} from "@app/core/models";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private _localStorageService: LocalStoreService, private _httpClient: HttpClient,) { }

  public saveEvent(event: Event): Observable<Response> {
    const token = this._localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/event/create';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.post<Response>(url, event, { headers }).pipe(map((res) => res));

  }

  public getEventsAll(): Observable<Response> {
    const token = this._localStorageService.getToken();
    const url: string = URL_API_GLOBAL + '/api/v1/event/all';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._httpClient.get<Response>(url, { headers }).pipe(map((res) => res));

  }
}
