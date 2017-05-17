import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { AuthGuardService } from './auth/shared/auth-guard.service';
import { ApiService } from './shared/api/api.service';
import { ApplicationService } from './shared/application/application.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from './shared/dialog/dialog.service';
import {
  MdButtonModule, MdDialogModule, MdMenuModule,
  MdInputModule, MdGridListModule, MdIconModule,
  MdSelectModule, MdProgressBarModule, MdSnackBarModule,
  MdCardModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { AccountComponent } from './account/account.component';
import { BillingPlanComponent } from './billing/billing-plan/billing-plan.component';
import { BillingCreditCardComponent } from './billing/billing-credit-card/billing-credit-card.component';
import { RedirectListComponent } from './redirect/redirect-list/redirect-list.component';
import { RedirectFormComponent } from './redirect/redirect-form/redirect-form.component';
import { RedirectHostSourceComponent } from './redirect/redirect-form/redirect-host-source.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { AuthLogoutComponent } from './auth/auth-logout/auth-logout.component';
import { RedirectFromToComponent } from './redirect/redirect-from-to/redirect-from-to.component';

const routes: Routes = [
  { path: '', component: RedirectListComponent, canActivate: [ AuthGuardService ] },
  { path: 'login', component: AuthLoginComponent },
  { path: 'logout', component: AuthLogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [ AuthGuardService ] },
  { path: 'billing', children: [
    { path: '', redirectTo: '/', pathMatch: 'full', canActivate: [ AuthGuardService ] },
    { path: 'plans', component: BillingPlanComponent, canActivate: [ AuthGuardService ] },
    { path: 'credit-card', component: BillingCreditCardComponent, canActivate: [ AuthGuardService ] }
  ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent, DialogComponent,
    AccountComponent, BillingPlanComponent, BillingCreditCardComponent, RedirectListComponent, 
    RedirectFormComponent, RedirectHostSourceComponent,
    AuthLoginComponent, AuthLogoutComponent, RedirectFromToComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MomentModule,
    MdButtonModule, MdDialogModule, MdMenuModule, MdInputModule, MdGridListModule, MdIconModule,
    MdSelectModule, MdProgressBarModule, MdSnackBarModule, MdCardModule,
    FlexLayoutModule,
    Ng2SmartTableModule
  ],
  entryComponents: [ DialogComponent, RedirectFormComponent, RedirectFromToComponent ],
  exports: [RouterModule],
  providers: [AuthGuardService, ApiService, ApplicationService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
