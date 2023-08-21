import {Component, OnInit} from '@angular/core';
import {LocalStoreService} from "@app/core/service/local-store/local-store.service";
import {Router} from "@angular/router";
import {Module} from "@app/core/models";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  mobileScreen: MediaQueryList = window.matchMedia('(max-width: 990px)');
  private modules: Module[] = [];
  public userName: string = '';

  public administration: any[] = [];
  public documents: any[] = [];
  constructor(private _localStorageService: LocalStoreService,
              private _route: Router) {
  }

  ngOnInit() {
    this.mobileScreen = window.matchMedia('(max-width: 990px)');
    this.setupEventListeners();
    this.getModules();
    this.getUserName();
  }

  setupEventListeners() {
    const dashboardNavDropdownToggles = document.querySelectorAll('.dashboard-nav-dropdown-toggle');
    const menuToggle = document.querySelector('.menu-toggle');

    dashboardNavDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const closestDropdown = toggle.closest('.dashboard-nav-dropdown');
        if (closestDropdown) {
          closestDropdown.classList.toggle('show');
          closestDropdown.querySelectorAll('.dashboard-nav-dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
          });
          toggle.parentElement?.parentElement?.querySelectorAll('.show').forEach(sibling => {
            sibling.classList.remove('show');
          });
        }
      });
    });

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        if (this.mobileScreen.matches) {
          document.querySelector('.dashboard-nav')?.classList.toggle('mobile-show');
        } else {
          document.querySelector('.dashboard')?.classList.toggle('dashboard-compact');
        }
      });
    }
  }

  private getUserName(): void {
    this.userName = this._localStorageService.getNames();
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
}
