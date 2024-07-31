import { Component, Input, OnInit } from '@angular/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community'; // Column Definition Type Interface
import { IAsset } from 'src/app/models/Asset.model';
import { ICellRendererAngularComp } from 'ag-grid-angular';

// Custom Button Component
@Component({
  standalone: true,
  template: `<div
    type="button"
    class="btn btn-danger btn-sm"
    (click)="buttonClicked()"
  >
    Sell
  </div>`,
})
export class CustomButtonComponent implements ICellRendererAngularComp {
  agInit(params: ICellRendererParams): void {}
  refresh(params: ICellRendererParams) {
    return true;
  }
  buttonClicked() {
    alert('clicked');
  }
}
// End Custom Button Component

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
})
export class DatagridComponent implements OnInit {
  private gridApi!: any;
  private gridColumnApi!: any;

  @Input() rowData!: any[];

  defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
  };

  colDefs: ColDef[] = [
    { field: 'name' },
    { field: 'type' },
    { field: 'ticker' },
    { field: 'qty' },
    { field: 'price', headerName: 'Booked Price' },
    {
      field: 'totalProfit',
      headerName: 'Total Profit',
      valueGetter: (params) => params.data.qty * params.data.price,
      valueFormatter: (params) => params.value.toFixed(2),
    },
    { field: 'PL', headerName: 'P&L' },
    { field: 'marketPrice', headerName: 'Market Price' },
    {
      field: 'sell',
      headerName: 'Sell',
      cellRenderer: CustomButtonComponent,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
}
