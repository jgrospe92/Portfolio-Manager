import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { SellComponent } from '../sell/sell.component';
import { YhooFinanceService } from 'src/app/services/yhoo-finance.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class DatagridComponent implements OnInit {
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private yhoofinance: YhooFinanceService,
    private sessionService: SessionService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  private gridApi!: any;
  private gridColumnApi!: any;
  userId!: number;

  @Input() currentPortfolio!: string;
  @Input() rowData!: any[];

  ngOnInit(): void {}

  onGridReady(params: any) {
    console.log('Row Data:', this.rowData);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
  };

  colDefs: ColDef[] = [
    { field: 'name' },
    { field: 'type' },
    { field: 'ticker_symbol', headerName: 'Ticker Symbol' },
    { field: 'quantity' },
    { field: 'average_price', headerName: 'Weighed average price' },
    {
      field: 'projected_profit',
      headerName: 'Project P&L',
      valueFormatter: (params) => params.value.toFixed(4),
    },
    {
      field: 'realized_profit',
      headerName: 'Realized P&L',
      valueFormatter: (params) => params.value.toFixed(4),
    },
    {
      field: 'current_price',
      headerName: 'Market Price',
      valueFormatter: (params) => params.value.toFixed(4),
    },
    { field: 'average_price', headerName: 'Average Price' },
    // {
    //   headerName: 'Unrealized P&L',
    //   valueGetter: (params) => params.data.quantity * params.data.price,
    //   valueFormatter: (params) => params.value.toFixed(2),
    // },
    // {
    //   headerName: 'Realized P&L',
    //   valueGetter: (params) =>
    //     (params.data.marketPrice - params.data.price) * params.data.quantity,
    // },
    // {
    //   field: 'marketPrice',
    //   headerName: 'Market Price',
    //   valueGetter: (params) => (params.data.marketPrice = 200), // Get Market price from Yahoo finance API
    // },
    {
      field: 'sell',
      headerName: 'Sell',
      cellRenderer: SellComponent,
      cellRendererParams: { portfolio: this.currentPortfolio, userId: 1 },
    },
  ];

  // TODO: Implement this method using the Yahoo Finance API
  async getMarketPrice(ticker: string): Promise<number> {
    try {
      const price = await this.yhoofinance.getMarketPrice(ticker);
      return price;
    } catch (error) {
      console.error('Error fetching market price:', error);
      return 0;
    }
  }

  getCurrentUserId(): number {
    return (this.sessionService.getItem('currentUser') as any).userId;
  }
}
