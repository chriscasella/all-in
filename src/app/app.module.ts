import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import 'rxjs'

// Material Modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// External Libraries
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WavesModule, InputsModule } from 'angular-bootstrap-md'
import { ChartsModule } from 'ng2-charts';
// constants
import { Constants } from './constants';
// My Components
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { CompanySelectComponent } from './landing/company-select/company-select.component';
import { CopyRightComponent } from './copy-right/copy-right.component';
import { StockService } from './stock.service';
import { CompanyComponent } from './company/company.component';
import { NavComponent } from './nav/nav.component';
import { InfoCardComponent } from './company/info-card/info-card.component';
import { AllInComponent } from './company/all-in/all-in.component';
import { ResultsWindowComponent } from './company/all-in/results-window/results-window.component';
import { RwDisplayBoxComponent } from './company/all-in/results-window/rw-display-box/rw-display-box.component';
import { MainComponent } from './main/main.component';
import { SectorContainerComponent } from './landing/sector-container/sector-container.component';
import { SectorInfoComponent } from './landing/sector-container/sector-info/sector-info.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { faCoffee }from '@fortawesome/free-solid-svg-icons'



const Routes = [
  {
    path: '',
    redirectTo:'/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent
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
    CompanyComponent,
    NavComponent,
    InfoCardComponent,
    AllInComponent,
    ResultsWindowComponent,
    RwDisplayBoxComponent,
    MainComponent,
    SectorContainerComponent,
    SectorInfoComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    HttpClientModule,
    RouterModule.forRoot(Routes),
    WavesModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [Constants, StockService],
  bootstrap: [AppComponent]
})
export class AppModule {}
