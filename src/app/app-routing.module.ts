import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin/student',
    loadChildren: () => import('@app/modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: '',
    loadChildren: () => import('@app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin/debt',
    loadChildren: () => import('@app/modules/debt/debt.module').then((m) => m.DebtModule),
  },
  {
    path: 'admin/attendance',
    loadChildren: () => import('@app/modules/attendance/attendance.module').then((m) => m.AttendanceModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('@app/modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'admin/inventory',
    loadChildren: () => import('@app/modules/inventary/inventary.module').then((m) => m.InventaryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
