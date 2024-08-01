import { Component, Input, OnInit, Output } from '@angular/core';
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
  @Input() isBuyValid!: boolean;
  private gridApi!: any;

  // TODO: replace this with the actual data coming from the mock csv file
  // we can create a service that reads the csv file and returns the data
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
    {
      name: 'Intel Corporation',
      instrument: 'Stock',
      ticker: 'INTC',
      price: 55,
    },
    {
      name: 'NVIDIA Corporation',
      instrument: 'Stock',
      ticker: 'NVDA',
      price: 800,
    },
    {
      name: 'Visa Inc.',
      instrument: 'Stock',
      ticker: 'V',
      price: 250,
    },
    {
      name: 'Mastercard Incorporated',
      instrument: 'Stock',
      ticker: 'MA',
      price: 350,
    },
    {
      name: 'Salesforce.com, Inc.',
      instrument: 'Stock',
      ticker: 'CRM',
      price: 250,
    },
    {
      name: 'PayPal Holdings, Inc.',
      instrument: 'Stock',
      ticker: 'PYPL',
      price: 300,
    },
    {
      name: 'Johnson & Johnson',
      instrument: 'Stock',
      ticker: 'JNJ',
      price: 150,
    },
    {
      name: 'Pfizer Inc.',
      instrument: 'Stock',
      ticker: 'PFE',
      price: 40,
    },
    {
      name: 'Coca-Cola Company',
      instrument: 'Stock',
      ticker: 'KO',
      price: 50,
    },
    {
      name: 'Walmart Inc.',
      instrument: 'Stock',
      ticker: 'WMT',
      price: 130,
    },
    {
      name: 'Procter & Gamble Company',
      instrument: 'Stock',
      ticker: 'PG',
      price: 140,
    },
    {
      name: 'Verizon Communications Inc.',
      instrument: 'Stock',
      ticker: 'VZ',
      price: 60,
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

  hasRowData(): boolean {
    return this.gridApi && this.gridApi.getDisplayedRowCount() > 0;
  }
}
