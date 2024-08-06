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
import { AssetService } from 'src/app/services/asset.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit, ICellRendererAngularComp {
  @ViewChild('content', { static: true })
  content!: TemplateRef<any>;
  modalRef!: NgbModalRef;

  stockNameAndTicker!: string;
  price!: number;
  quantity!: number;
  userBalance!: number;
  totalAmount: any = 0;
  currentPortfolio!: string;
  currentUserId!: number;

  private params: any;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private assetService: AssetService,
    private sessionService: SessionService
  ) {}

  refresh(params: ICellRendererParams) {
    this.params = params;
    this.setUserFund();
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    console.log('agInit params', params);
    this.setUserFund();
    this.currentPortfolio = params.data.portfolio;
  }

  ngOnInit(): void {}

  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      centered: true,
    });
  }

  getMaxQuantity(): number {
    return this.params.data.quantity;
  }

  calculateTotal(): void {
    if (this.quantity < 0 || !this.validateQuantity()) {
      this.quantity = 0;
    }
    if (this.quantity > this.params.data.quantity) {
      this.quantity = this.params.data.quantity;
    }
    this.totalAmount = (this.quantity * this.price).toFixed(4);
  }

  validateQuantity(): boolean {
    return Number.isInteger(this.quantity);
  }

  instantiateStockData() {
    this.quantity = 0;
    this.price = this.params.data.current_price.toFixed(4);
    this.stockNameAndTicker = `${this.params.data.name} (${this.params.data.ticker_symbol})`;
    this.userService.getUserById(this.params.userId).subscribe((user) => {
      this.userBalance = user.funds;
    });
  }

  // TODO: implement the send order function
  sendOrder() {
    this.assetService
      .sellAsset(
        this.params.data.ticker_symbol,
        this.quantity,
        (this.sessionService.getItem('currentUser') as any).portfolio,
        this.price
      )
      .subscribe((response) => {
        this.modalRef.close();
        setTimeout(() => {
          location.reload();
        }, 500);
      });
  }

  openSellWindow() {
    this.open(this.content);
    this.instantiateStockData();
  }

  close() {
    this.modalService.dismissAll();
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  private setUserFund() {
    this.currentUserId = this.params.data.userId;
  }
}
