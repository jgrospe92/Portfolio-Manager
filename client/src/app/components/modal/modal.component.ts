import {
  Component,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community'; // Column Definition Type Interface
import { IAsset } from 'src/app/models/Asset.model';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Custom Button Component
@Component({
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal.component.scss'],
  template: `<ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title">Order Entry</h4>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          (click)="modal.dismiss('Cross click')"
        ></button>
      </div>
      <div class="modal-body">
        <div class="d-flex flex-column ">
          <p>{{ stockNameAndTicker.toUpperCase() }}</p>
          <p class="stockPrice">Price per share : {{ price }}</p>
        </div>
        <div class="app_buy_layout row align-items-center">
          <div class="col-auto">
            <label for="qty" class="col-form-label">QTY: </label>
          </div>
          <div class="col-auto app_buy_layout__qtyForm">
            <input
              type="number"
              class="form-control form-control-sm"
              aria-describedby="qty"
              id="qty"
              [(ngModel)]="quantity"
              (input)="calculateTotal()"
              min="0"
              value="0"
            />
          </div>
          <div class="col-auto">
            <label class="col-form-label">Account: </label>
          </div>
          <div class="col-auto">
            <select class="form-select" aria-label="account">
              <option *ngFor="let account of accounts" [value]="account">
                {{ account }}
              </option>
            </select>
          </div>
          <div class="col-auto">
            <label class="col-form-label">Total: {{ totalAmount }} </label>
          </div>
        </div>
      </div>
      <div class="modal-footer app_buy_footer">
        <div>
          <p>Available Balance: {{ userBalance }}</p>
        </div>
        <div class="">
          <button
            type="button"
            class="btn btn-success btn-sm me-2"
            [disabled]="quantity === 0 || totalAmount > userBalance"
            (click)="sendOrder()"
          >
            Send Order
          </button>
          <button
            type="button"
            class="btn btn-secondary  btn-sm"
            (click)="modal.close('Close click')"
          >
            Close
          </button>
        </div>
      </div>
    </ng-template>
    <div type="button" class="btn btn-success btn-sm" (click)="openBuyWindow()">
      Buy
    </div>`,
  imports: [DropdownComponent, CommonModule, FormsModule],
})
export class CustomButtonComponent implements ICellRendererAngularComp {
  @ViewChild('content', { static: true })
  content!: TemplateRef<any>;
  modalRef!: NgbModalRef;
  // TODO: replace with the actual data coming from DB
  // TODO: replace with the actual data
  accounts: string[] = ['High Yield Technology', 'S&P 500']; // use the data from the portfolio component
  stockNameAndTicker!: string;
  price!: number;
  quantity!: number;
  userBalance!: number;
  totalAmount: number = 0;

  constructor(private modalService: NgbModal) {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }
  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      centered: true,
    });
  }
  private params: any;

  openBuyWindow() {
    this.open(this.content);
    this.instantiateStockData();
  }

  instantiateStockData() {
    this.quantity = 0;
    this.price = this.params.data.price;
    this.stockNameAndTicker = `${this.params.data.name} (${this.params.data.ticker})`;
    this.userBalance = 10000; // TODO: replace with the actual data
  }

  calculateTotal(): void {
    if (this.quantity < 0 || !this.validateQuantity()) {
      this.quantity = 0;
    }
    this.totalAmount = this.quantity * this.price;
  }

  validateQuantity(): boolean {
    return Number.isInteger(this.quantity);
  }

  // TODO: implement the send order function
  sendOrder() {
    alert('Order Sent');
  }

  // onSelectedPortfolio(portfolio: string) {
  //   switch (portfolio) {
  //     case 'High Yield Technology':
  //       break;
  //     case 'S&P 500':
  //       break;
  //     default:

  //       break;
  //   }
  // }
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
    {
      headerName: 'Buy',
      field: 'buy',
      cellRenderer: CustomButtonComponent,
    },
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
