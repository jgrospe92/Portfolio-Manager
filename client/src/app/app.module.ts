import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NavComponent } from './shared/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { CommunicationService } from './services/communication.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavComponent,
    PortfolioComponent,
    
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, AgGridAngular, HttpClientModule],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
