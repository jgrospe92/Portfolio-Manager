import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private readonly baseUrl: string = environment.serverUrl;

  constructor(private readonly http: HttpClient) {}
}
