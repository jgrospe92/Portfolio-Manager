import { Component, OnInit } from '@angular/core';
import { IAsset } from 'src/app/models/Asset.model';
import { Portfolio } from 'src/app/models/Portfolio.model';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  dropdownItems!: string[];
  rowData: any[] = [];
  portfolios: Portfolio[] = [];
  current_user: number = 1;

  constructor(private communication: CommunicationService) {}
  // TODO : replace with actual data coming from the backed
  currentUser = 'John Doe';

  ngOnInit(): void {
    this.communication
      .getPortfolios(this.current_user)
      .subscribe((portfolios: Portfolio[]) => {
        console.log(portfolios);
        this.portfolios = portfolios;
        this.dropdownItems = portfolios.map((portfolio) => portfolio.name);
      });
  }

  setRowData(portfolio_id: number) {
    this.communication
      .getPortfolioAssetsByID(portfolio_id)
      .subscribe((assets: any) => {
        this.rowData = assets;
      });
  }

  getPortfolioIdByName(name: string): number {
    let portfolios = this.portfolios;
    for (const portfolio of portfolios) {
      if (portfolio.name === name) {
        return portfolio.portfolio_id;
      }
    }
    return 0; // Return null if no matching portfolio is found
  }

  onSelectedPortfolio(portfolio_name: string) {
    const portfolioId = this.getPortfolioIdByName(portfolio_name);
    console.log(portfolioId);
    this.setRowData(portfolioId);
    console.log(this.rowData);
  }

  /**
   * Description placeholder
   * Check if any portfolio is selected
   * TODO: Check if the user has balance > 0
   * @returns {boolean}
   */
  isPortfolioSelected(): boolean {
    return this.rowData.length > 0;
  }
}
