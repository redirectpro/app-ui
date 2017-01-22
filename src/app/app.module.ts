import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';

import { AppComponent } from './app.component';
import { AuthIdSiteResultComponent } from './auth/auth-id-site-result/auth-id-site-result.component';
import { AccountComponent } from './account/account.component';
import { AccountRegisterComponent } from './account/account-register/account-register.component';
import { AccountLoginComponent } from './account/account-login/account-login.component';
import { AccountLogoutComponent } from './account/account-logout/account-logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: 'register', component: AccountRegisterComponent },
      { path: 'login', component: AccountLoginComponent },
      { path: 'logout', component: AccountLogoutComponent }
    ]
  },
  { path: 'auth/id-site-result/:action', component: AuthIdSiteResultComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent, AccountLoginComponent, AccountLogoutComponent, AuthIdSiteResultComponent, DashboardComponent, AccountRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes),
    MaterialModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }