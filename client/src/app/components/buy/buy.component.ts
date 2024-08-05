import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
})
export class BuyComponent implements OnInit, ICellRendererAngularComp {
  @ViewChild('content', { static: true })
  content!: TemplateRef<any>;
  modalRef!: NgbModalRef;

  accounts: string[] = ['High Yield Technology', 'S&P 500']; // use the data from the portfolio component
  stockNameAndTicker!: string;
  price!: number;
  quantity!: number;
  userBalance!: number;
  totalAmount: number = 0;
  private params: any;

  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {}
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
