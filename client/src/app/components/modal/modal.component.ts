import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community'; // Column Definition Type Interface
import { IAsset } from 'src/app/models/Asset.model';

// Custom Button Component
@Component({
  standalone: true,
  template: `<div
    type="button"
    class="btn btn-success btn-sm"
    (click)="buttonClicked()"
  >
    Buy
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
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ModalComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  private gridApi!: any;

  // TODO: replace this with the actual data coming from the mock csv file
  rowData: any[] | null = [
    {
      name: 'Apple Inc',
      instrument: 'Stock',
      ticker: 'AAPL',
      price: 150,
    },
    {
      name: 'Microsoft Corporation',
      instrument: 'Stock',
      ticker: 'MSFT',
      price: 300,
    },
    {
      name: 'Amazon.com, Inc.',
      instrument: 'Stock',
      ticker: 'AMZN',
      price: 3500,
    },
    {
      name: 'Alphabet Inc.',
      instrument: 'Stock',
      ticker: 'GOOGL',
      price: 2500,
    },
    {
      name: 'Facebook, Inc.',
      instrument: 'Stock',
      ticker: 'FB',
      price: 350,
    },
    {
      name: 'Tesla, Inc.',
      instrument: 'Stock',
      ticker: 'TSLA',
      price: 700,
    },
    {
      name: 'Netflix, Inc.',
      instrument: 'Stock',
      ticker: 'NFLX',
      price: 550,
    },
    {
      name: 'Adobe Inc.',
      instrument: 'Stock',
      ticker: 'ADBE',
      price: 600,
    },
  ];

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Ticker', field: 'ticker' },
    { headerName: 'Instrument', field: 'instrument' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Buy', field: 'buy', cellRenderer: CustomButtonComponent },
  ];

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onSearch(event: any) {
    this.gridApi.setQuickFilter(event.target.value);
  }
}
