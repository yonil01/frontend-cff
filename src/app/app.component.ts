import {Component, OnInit} from '@angular/core';
import {LocalStoreService} from "@app/core/service/local-store/local-store.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend-projetc-cff';

  constructor(private _localStorageService: LocalStoreService,
              private translate: TranslateService,) {

  }

  ngOnInit() {
    this.setLanguage();
  }


  private setLanguage(): void {
    const lang = this._localStorageService.getLanguage();
    this.translate.setDefaultLang('es');
    this.translate.use(lang);
  }
}

