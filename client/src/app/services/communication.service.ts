import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private readonly baseUrl: string = environment.serverUrl;

  constructor(private readonly http: HttpClient) {}

  // User endpoints

  createUser(
    username: string,
    password: string,
    email: string
  ): Observable<any> {
    const url = `${this.baseUrl}/users`;
    const body = { username, password, email };
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  getUsers(): Observable<any> {
    const url = `${this.baseUrl}/users`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  // Portfolio endpoints

  createPortfolio(
    userId: number,
    name: string,
    description: string
  ): Observable<any> {
    const url = `${this.baseUrl}/portfolios`;
    const body = { user_id: userId, name, description };
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }

  getPortfolios(userId: number): Observable<any> {
    const url = `${this.baseUrl}/portfolios/${userId}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  getPortfolioAssetsByID(userId: number): Observable<any> {
    const url = `${this.baseUrl}/assets/${userId}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  getMarketAssetsByName(name: string): Observable<any> {
    const url = `${this.baseUrl}/market_assets/${name}`;
    console.log(url)
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  deletePortfolio(portfolioId: number): Observable<any> {
    const url = `${this.baseUrl}/portfolios/${portfolioId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

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

  deleteAsset(assetId: number): Observable<any> {
    const url = `${this.baseUrl}/assets/${assetId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  updateAssetName(assetId: number, name: string): Observable<any> {
    const url = `${this.baseUrl}/assets/${assetId}`;
    const body = { name };
    return this.http.put(url, body).pipe(catchError(this.handleError));
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
