import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio.model';
import { CommunicationService } from 'src/app/services/communication.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  parentGridApi!: any;
  dropdownItems!: string[];
  rowData: any[] = [];
  portfolios: Portfolio[] = [];
  selectedPortfolioId: number = -1;
  userCanBuy: boolean = false;
  current_user: number = 1;
  currentUser!: string;
  currentUserId!: number;
  currentPortfolio!: string;
  currentUserFunds!: number;
  parentGrid!: any;
  isSelected: boolean = false;

  realizedPnL: any = '';
  unrealizedPnL: any = '';

  constructor(
    private portfolio: PortfolioService,
    private user: UserService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.user.getUserById(this.current_user).subscribe((user: any) => {
      this.currentUser = user.username;
      this.currentUserFunds = user.funds;
      this.currentUserId = user.user_id;
    });

    this.portfolio
      .getPortfolios(this.current_user)
      .subscribe((portfolios: Portfolio[]) => {
        this.portfolios = portfolios;
        this.dropdownItems = portfolios.map((portfolio) => portfolio.name);
      });

    if (this.selectedPortfolioId) {
      setInterval(() => {
        this.getPortfolioRealizedPnL(this.selectedPortfolioId);
        this.getPortfolioUnrealizedPnL(this.selectedPortfolioId);
        this.setRowData(this.selectedPortfolioId);
      }, 5000);
    }
  }

  setRowData(portfolio_id: number) {
    this.portfolio
      .getPortfolioAssetsByID(portfolio_id)
      .subscribe((assets: any[]) => {
        this.rowData = assets;
      });
  }

  getParentGridApi(data: any) {
    this.parentGrid = data;
  }

  private getPortfolioRealizedPnL(portfolio_id: number) {
    this.portfolio.getPortfolioRealizedPnL(portfolio_id).subscribe((data) => {
      this.realizedPnL = this.numberFormatter(data.realized_profit_loss);
    });
  }

  private getPortfolioUnrealizedPnL(portfolio_id: number) {
    this.portfolio.getUnrealizedPortfolioPnL(portfolio_id).subscribe((data) => {
      this.unrealizedPnL = this.numberFormatter(data.unrealized_profit_loss);
    });
  }

  getPortfolioIdByName(name: string): number {
    let portfolios = this.portfolios;
    for (const portfolio of portfolios) {
      if (portfolio.name === name) {
        return portfolio.portfolio_id;
      }
    }
    return -1;
  }

  onSelectedPortfolio(portfolio_name: string) {
    this.userCanBuy = true;
    this.selectedPortfolioId = this.getPortfolioIdByName(portfolio_name);
    this.sessionService.setItem('currentUser', {
      id: this.currentUserId,
      name: this.currentUser,
      portfolio: this.selectedPortfolioId,
    });
    this.setRowData(this.selectedPortfolioId);
    this.getPortfolioRealizedPnL(this.selectedPortfolioId);
    this.getPortfolioUnrealizedPnL(this.selectedPortfolioId);
    this.isSelected = true;
  }

  private numberFormatter(value: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2,
    });
    return value == null ? 'NA' : formatter.format(value);
  }
}
