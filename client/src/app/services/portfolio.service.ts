import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly baseUrl: string = environment.serverUrl;

  constructor(private readonly http: HttpClient) {}

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

  deletePortfolio(portfolioId: number): Observable<any> {
    const url = `${this.baseUrl}/portfolios/${portfolioId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
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
