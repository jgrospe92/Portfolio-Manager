import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private readonly baseUrl: string = environment.serverUrl;

  constructor(private readonly http: HttpClient) {}

  createAsset(
    name: string,
    type: string,
    tickerSymbol: string
  ): Observable<any> {
    const url = `${this.baseUrl}/assets`;
    const body = { name, type, ticker_symbol: tickerSymbol };
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  getAssets(): Observable<any> {
    const url = `${this.baseUrl}/assets`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  sellAsset(
    ticker_symbol: string,
    quantity: number,
    portfolio_id: number,
    price_per_unit: number
  ): Observable<any> {
    const url = `${this.baseUrl}/sell`;
    const body = { ticker_symbol, quantity, portfolio_id, price_per_unit };
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  deleteAsset(assetId: number): Observable<any> {
    const url = `${this.baseUrl}/assets/${assetId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  updateAssetName(assetId: number, name: string): Observable<any> {
    const url = `${this.baseUrl}/assets/${assetId}`;
    const body = { name };
    return this.http.put(url, body).pipe(catchError(this.handleError));
  }

  getRealTimePrice(tickerSymbol: string): Observable<any> {
    const url = `${this.baseUrl}/real_time_price/${tickerSymbol}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
