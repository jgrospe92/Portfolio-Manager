import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://www.alphavantage.co/query?';
  private apiKey = '2PQTYORUAMIEYQYN';

  constructor(private http: HttpClient) {}

  getHistoricalData(ticker: string): Observable<HistoricalData[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = `${this.baseUrl}function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${this.apiKey}`;
    return this.http.get<any>(url, httpOptions).pipe(
      map(response => {
        const timeSeries = response['Time Series (Daily)'];
        return Object.keys(timeSeries).map(date => ({
          date,
          open: parseFloat(timeSeries[date]['1. open']),
          high: parseFloat(timeSeries[date]['2. high']),
          low: parseFloat(timeSeries[date]['3. low']),
          close: parseFloat(timeSeries[date]['4. close']),
          volume: parseFloat(timeSeries[date]['5. volume'])
        }));
      })
    );
  }
}
