import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { IAsset } from 'src/app/models/Asset.model';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
})
export class DatagridComponent implements OnInit {
  private gridApi!: any;
  private gridColumnApi!: any;

  @Input() rowData!: IAsset[];

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
  ];

  constructor() {}

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
}
