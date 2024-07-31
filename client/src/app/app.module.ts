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
import { CommunicationService } from './services/communication.service';
import { AgGridAngular } from 'ag-grid-angular';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DatagridComponent } from './components/datagrid/datagrid.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavComponent,
    PortfolioComponent,
    DatagridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AgGridAngular,
    DropdownComponent,
    HttpClientModule,
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
