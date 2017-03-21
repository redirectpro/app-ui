import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { ApiService } from './api/api.service';

import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanComponent } from './billing/plan/plan.component';
import { CreditCartdComponent } from './billing/credit-cartd/credit-cartd.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
  { path: 'billing', children: [
    { path: '', redirectTo: '/', pathMatch: 'full', canActivate: [AuthGuardService] },
    { path: 'plans', component: PlanComponent, canActivate: [AuthGuardService] },
    { path: 'credit-card', component: CreditCartdComponent, canActivate: [AuthGuardService] }
  ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent, DialogComponent,
    AccountComponent, DashboardComponent, PlanComponent, CreditCartdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
  ],
  entryComponents: [ DialogComponent ],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
