import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit, ICellRendererAngularComp {
  @Input() selectedPortfolio!: ICellRendererParams;

  @ViewChild('content', { static: true })
  content!: TemplateRef<any>;
  modalRef!: NgbModalRef;

  stockNameAndTicker!: string;
  price!: number;
  quantity!: number;
  userBalance!: number;
  totalAmount: number = 0;
  currentPortfolio!: string;

  private params: any;

  constructor(private modalService: NgbModal) {}

  refresh(params: ICellRendererParams) {
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.currentPortfolio = params.data.portfolio;
  }

  ngOnInit(): void {}

  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      centered: true,
    });
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

  instantiateStockData() {
    this.quantity = 0;
    this.price = this.params.data.price;
    this.stockNameAndTicker = `${this.params.data.name} (${this.params.data.ticker})`;
    this.userBalance = 10000; // TODO: replace with the actual data
  }

  // TODO: implement the send order function
  sendOrder() {
    console.log(this.selectedPortfolio);
    alert('Order Sent');
  }

  openSellWindow() {
    this.open(this.content);
    this.instantiateStockData();
  }
}
