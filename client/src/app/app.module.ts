import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
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
import { DynamicBtnComponent } from './components/dynamic-btn/dynamic-btn.component';
import { ModalComponent } from './components/modal/modal.component';
import { DateAndTimeComponent } from './components/date-and-time/date-and-time.component';
import { BuyComponent } from './components/buy/buy.component';
import { SellComponent } from './components/sell/sell.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { NbSharesChartComponent } from './nb-shares-chart/nb-shares-chart.component';

@NgModule({ declarations: [
  AppComponent,
  HomeComponent,
  PageNotFoundComponent,
  NavComponent,
  PortfolioComponent,
  DatagridComponent,
  DynamicBtnComponent,
  ModalComponent,
  DateAndTimeComponent,
  BuyComponent,
  SellComponent,
  LineChartComponent,
  PieChartComponent,
  SummaryComponent,
  NbSharesChartComponent,
    ],
    bootstrap: [AppComponent], imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      AgGridAngular,
      DropdownComponent,
      HttpClientModule,
      FormsModule,
      CanvasJSAngularChartsModule
    ], providers: [CommunicationService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
