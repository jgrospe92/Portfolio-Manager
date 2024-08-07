import { Component, Input, OnInit } from '@angular/core';
import { ColDef, ValueFormatterFunc } from 'ag-grid-community'; // Column Definition Type Interface
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SellComponent } from '../sell/sell.component';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class DatagridComponent implements OnInit {
  constructor(config: NgbModalConfig, private sessionService: SessionService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  private gridApi!: any;
  private gridColumnApi!: any;
  userId!: number;

  @Input() currentPortfolio!: string;
  @Input() rowData!: any[];

  suppressAggFuncInHeader: boolean = true;

  statusBar = {
    statusPanels: [
      { statusPanel: 'agTotalAndFilteredRowCountComponent' },
      { statusPanel: 'agTotalRowCountComponent' },
      { statusPanel: 'agFilteredRowCountComponent' },
      { statusPanel: 'agSelectedRowCountComponent' },
      { statusPanel: 'agAggregationComponent' },
    ],
  };

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true,
    cellRenderer: 'agAnimateShowChangeCellRenderer',
  };

  colDefs: ColDef[] = [
    { field: 'name' },
    { field: 'type' },
    { field: 'ticker_symbol', headerName: 'Ticker' },
    { field: 'quantity', maxWidth: 100, headerName: 'Qty' },
    { field: 'average_price', headerName: 'Weighed AVG' },
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
    { field: 'average_price', headerName: 'AVG Price' },
    {
      field: 'sell',
      headerName: 'Sell',
      cellRenderer: SellComponent,
      floatingFilter: false,
      maxWidth: 100,
      cellRendererParams: { portfolio: this.currentPortfolio, userId: 1 },
    },
  ];

  getCurrentUserId(): number {
    return (this.sessionService.getItem('currentUser') as any).userId;
  }
}
