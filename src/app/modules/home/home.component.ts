import {Component, OnInit} from '@angular/core';
import {LocalStoreService} from "@app/core/service/local-store/local-store.service";
import {Router} from "@angular/router";
import {Module} from "@app/core/models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {

  private modules: Module[] = [];

  public administration: any[] = [];
  public documents: any[] = [];
  constructor(
    private _localStorageService: LocalStoreService,
    private _route: Router
  ) {

  }
  ngOnInit(): void {
    this.getDataDynamic();
    this.getModules();
  }

  private getModules(): void {
    this.modules = this._localStorageService.getModules();
    console.log(this.modules);
    this.modules.map((element) => {
      if (element.id === 'c1fa60ba-a9af-45f9-9a25-7b8b224d35bc') {
        this.documents.push({
          id: element.id,
          label: element.name,
          active: false,
          class: element.class,
          path: element.path,
          items: element.components?.map((component) => {
            return {
              id: component.id,
              label: component.name,
              path: element.path,
              icon: component.class,
              routerLink: [component.url_front],
            };
          }),
        });
      } else {
        this.administration.push( {
          id: element.id,
          label: element.name,
          active: false,
          class: element.class,
          path: element.path,
          items: element.components?.map((component) => {
            return {
              id: component.id,
              label: component.name,
              path: element.path,
              icon: component.class,
              routerLink: [component.url_front],
            };
          }),
        });
      }
    });
  }
  public getDataDynamic(): void {
   // this.url_banner_home = EnvServiceProvider.useFactory().BANNER_URL_HOME;
  }
}
