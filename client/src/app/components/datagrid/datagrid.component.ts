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

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class DatagridComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  private gridApi!: any;
  private gridColumnApi!: any;
  userRowData: any[] = [];

  @Input() currentPortfolio!: string;
  @Input() rowData!: any[];

  defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
  };

  colDefs: ColDef[] = [
    { field: 'name' },
    { field: 'type' },
    { field: 'ticker_symbol' },
    { field: 'quantity' },
    { field: 'average_price', headerName: 'Weighed average price' },
    { field: 'projected_profit', headerName: 'Project P&L' },
    { field: 'realized_profit', headerName: 'Realized P&L' },
    { field: 'current_price', headerName: 'Market Price' },
    {
      field: 'sell',
      headerName: 'Sell',
      cellRenderer: SellComponent,
      cellRendererParams: { portfolio: this.currentPortfolio },
    },
  ];

  ngOnInit(): void {
    console.log(this.rowData);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
}
