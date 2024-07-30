import { Component, OnInit } from '@angular/core';
import { IAsset } from 'src/app/models/Asset.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  dropdownItems: string[] = ['High Yield Technology', 'S&P 500'];
  rowData: IAsset[] = [];

  // TODO : replace with actual data coming from the backed
  portfolioData1: IAsset[] = [
    {
      id: 1,
      name: 'Tesla',
      type: 'Motor Vehicles',
      ticker: 'TSLA',
      qty: 20,
      price: 200.5,
      PL: 1000,
      marketPrice: 250.5,
    },
    {
      id: 2,
      name: 'Amazon',
      type: 'Technology',
      ticker: 'AMZA',
      qty: 10,
      price: 181.71,
      PL: 1000,
      marketPrice: 250.5,
    },
    {
      id: 3,
      name: 'Alphabet Inc',
      type: 'Technology',
      ticker: 'GOOG',
      qty: 200,
      price: 171.86,
      PL: 1000,
      marketPrice: 250.5,
    },
  ];

  portfolioData2: IAsset[] = [
    {
      id: 4,
      name: 'Microsoft',
      type: 'Technology',
      ticker: 'MSFT',
      qty: 50,
      price: 300.25,
      PL: 1000,
      marketPrice: 350.5,
    },
    {
      id: 5,
      name: 'Apple',
      type: 'Technology',
      ticker: 'AAPL',
      qty: 30,
      price: 150.75,
      PL: 1000,
      marketPrice: 200.5,
    },
    {
      id: 6,
      name: 'Facebook',
      type: 'Technology',
      ticker: 'FB',
      qty: 40,
      price: 250.5,
      PL: 1000,
      marketPrice: 300.75,
    },
    {
      id: 7,
      name: 'Netflix',
      type: 'Entertainment',
      ticker: 'NFLX',
      qty: 20,
      price: 500.25,
      PL: 1000,
      marketPrice: 600.5,
    },
    {
      id: 8,
      name: 'Johnson & Johnson',
      type: 'Pharmaceuticals',
      ticker: 'JNJ',
      qty: 25,
      price: 150.5,
      PL: 1000,
      marketPrice: 200.75,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedPortfolio(portfolio: string) {
    switch (portfolio) {
      case 'High Yield Technology':
        this.rowData = this.portfolioData1;
        break;
      case 'S&P 500':
        this.rowData = this.portfolioData2;
        break;
      default:
        this.rowData = [];
        break;
    }
  }
}
