import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef, ValueFormatterFunc } from 'ag-grid-community'; // Column Definition Type Interface
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SellComponent } from '../sell/sell.component';
import { SessionService } from 'src/app/services/session.service';

const numberFormatter: ValueFormatterFunc = (params) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 2,
  });
  return params.value == null ? 'NA' : formatter.format(params.value);
};

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
  @Output() parentGrid = new EventEmitter<any>();

  suppressAggFuncInHeader: boolean = true;

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.parentGrid.emit(this.gridApi);
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
    {
      field: 'average_price',
      headerName: 'Weighed AVG',
      valueFormatter: numberFormatter,
    },
    {
      field: 'projected_profit',
      headerName: 'Project P&L',
      valueFormatter: numberFormatter,
    },
    {
      field: 'realized_profit',
      headerName: 'Realized P&L',
      valueFormatter: numberFormatter,
    },
    {
      field: 'current_price',
      headerName: 'Market Price',
      valueFormatter: numberFormatter,
    },
    { field: 'average_price', headerName: 'AVG Price' },
    {
      field: 'sell',
      headerName: 'Sell',
      cellRenderer: SellComponent,
      floatingFilter: false,
      maxWidth: 100,
    },
  ];

  getCurrentUserId(): number {
    return (this.sessionService.getItem('currentUser') as any).userId;
  }
}
