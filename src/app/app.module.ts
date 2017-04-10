import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { ApiService } from './api/api.service';
import { ApplicationService } from './application/application.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from './dialog/dialog.service';
import {
  MdButtonModule, MdDialogModule, MdMenuModule,
  MdInputModule, MdGridListModule, MdIconModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanComponent } from './billing/plan/plan.component';
import { CreditCardComponent } from './billing/credit-card/credit-card.component';
import { RedirectListComponent } from './redirect/redirect-list/redirect-list.component';
import { RedirectFormComponent } from './redirect/redirect-form/redirect-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'account', component: AccountComponent, canActivate: [ AuthGuardService ] },
  { path: 'billing', children: [
    { path: '', redirectTo: '/', pathMatch: 'full', canActivate: [ AuthGuardService ] },
    { path: 'plans', component: PlanComponent, canActivate: [ AuthGuardService ] },
    { path: 'credit-card', component: CreditCardComponent, canActivate: [ AuthGuardService ] }
  ]},
  { path: 'redirect', children: [
    { path: '', component: RedirectListComponent, canActivate: [ AuthGuardService ] },
    { path: 'new', component: RedirectFormComponent, canActivate: [ AuthGuardService ] },
    { path: ':redirectId/edit', component: RedirectFormComponent, canActivate: [ AuthGuardService ] }
  ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent, DialogComponent,
    AccountComponent, DashboardComponent, PlanComponent, CreditCardComponent, RedirectListComponent, RedirectFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MomentModule,
    MdButtonModule, MdDialogModule, MdMenuModule, MdInputModule, MdGridListModule, MdIconModule
  ],
  entryComponents: [ DialogComponent ],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthService, ApiService, ApplicationService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
