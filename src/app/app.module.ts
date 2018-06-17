import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';

import { WavesModule, InputsModule } from 'angular-bootstrap-md'

import { Constants } from './constants';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { CompanySelectComponent } from './landing/company-select/company-select.component';
import { CopyRightComponent } from './copy-right/copy-right.component';
import { StockService } from './stock.service';
import { CompanyComponent } from './company/company.component';

const Routes = [
  {
    path: '', pathMatch: 'full',
    component:AppComponent
  },
  {
    path: 'company/:companySymbol',
    pathMatch: 'full',
    component: CompanyComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CompanySelectComponent,
    CopyRightComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(Routes),
    WavesModule
  ],
  providers: [Constants, StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
