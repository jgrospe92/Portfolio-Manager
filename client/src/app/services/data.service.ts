import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  private readonly baseUrl: string = environment.serverUrl;


  constructor(private http: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getHistoricalData(ticker: string): Observable<HistoricalData[]> {
    const url = `${this.baseUrl}/historical-data/${ticker}`;

    return this.http.get<HistoricalData[]>(url, this.httpOptions).pipe(
      map((response: HistoricalData[]) => {
        return response.map((item: HistoricalData) => ({
          date: item.date,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume
        }));
      })
    );
  }
}
