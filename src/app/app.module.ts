import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { WavesModule } from 'angular-bootstrap-md'

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { CompanySelectComponent } from './landing/company-select/company-select.component';
import { CopyRightComponent } from './copy-right/copy-right.component';
import { StockService } from './stock.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CompanySelectComponent,
    CopyRightComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WavesModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
