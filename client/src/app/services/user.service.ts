import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string = environment.serverUrl;

  constructor(private readonly http: HttpClient) {}

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

  getUserById(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
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
