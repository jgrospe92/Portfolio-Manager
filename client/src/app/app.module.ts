import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { NavComponent } from './shared/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioComponent } from './page/portfolio/portfolio.component';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavComponent,
    PortfolioComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, AgGridAngular],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
