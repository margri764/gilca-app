import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/pages/login/login/login.component';
import { DashboardComponent } from './shared/pages/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'login',  component: LoginComponent
  },
  {
    path: 'home',  component: DashboardComponent
  },
 
  {
    path: "", redirectTo: "login", pathMatch: 'full'
  },
  {
    path: '**',    redirectTo: 'login'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
