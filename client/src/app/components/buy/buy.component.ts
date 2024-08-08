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
import { AssetService } from 'src/app/services/asset.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
})
export class BuyComponent implements OnInit, ICellRendererAngularComp {
  @ViewChild('content', { static: true })
  content!: TemplateRef<any>;
  modalRef!: NgbModalRef;

  portfolios!: string[];
  selectedPortfolio!: string;
  getCurrentUserId!: number;
  stockNameAndTicker!: string;
  price!: number;
  quantity!: number;
  userBalance!: number;
  totalAmount: number = 0;

  private params: any;

  constructor(
    private modalService: NgbModal,
    private sessionService: SessionService,
    private user: UserService,
    private portfolioService: PortfolioService,
    private assetService: AssetService
  ) {}
  ngOnInit(): void {
    this.user.getUserById(this.getCurrentUserId).subscribe((user: any) => {
      this.userBalance = user.funds;
    });
  }

  agInit(params: ICellRendererParams): void {
    this.loadUserPortfolios();
    this.params = params;
    console.log('params', params);
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    this.loadUserPortfolios();
    return true;
  }

  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      centered: true,
    });
  }

  loadUserPortfolios() {
    this.getCurrentUserId = (
      this.sessionService.getItem('currentUser') as any
    ).id;
    this.portfolioService
      .getPortfolios(this.getCurrentUserId)
      .subscribe((data) => {
        this.portfolios = data.map((portfolio: any) => portfolio.name);
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

  sendOrder() {
    var name = this.params.data.name;
    var type = this.params.data.type;
    var ticker_symbol = this.params.data.ticker;
    var qty = this.quantity;
    var portfolio_id = this.portfolios.indexOf(this.selectedPortfolio) + 1;
    var price = this.price;

    this.assetService
      .buyAsset(name, type, ticker_symbol, qty, portfolio_id, price)
      .subscribe((data) => {
        if (data.status === 'success') {
          this.portfolioService
            .getPortfolioAssetsByID(portfolio_id)
            .subscribe((portfolio) => {
              this.sessionService.setItem('portfolioID', portfolio_id);
            });
        }
      });

    this.modalRef.close();
  }
}
