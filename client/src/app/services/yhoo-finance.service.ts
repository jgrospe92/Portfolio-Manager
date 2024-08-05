import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class YhooFinanceService {
  private baseUrl =
    'https://query1.finance.yahoo.com/v7/finance/quote?symbols=';

  ngOnInit(): void {}

  async getMarketPrice(ticker: string): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}${ticker}`);
      const price = response.data.quoteResponse.result[0].regularMarketPrice;
      return price;
    } catch (error) {
      console.error('Error fetching market price:', error);
      throw error;
    }
  }
}
