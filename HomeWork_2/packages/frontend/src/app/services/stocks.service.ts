// stock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://localhost:3600';  // Your backend API URL

  constructor(private http: HttpClient) {}

  // Get stock symbols and publisher codes
  getStockCodes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/stock-codes`);
  }

  // Get stock data for a specific stock symbol or publisher code
  getStockData(code: string, type: 'stockSymbol' | 'publisherCode'): Observable<any> {
    const endpoint = type === 'stockSymbol' ? '/api/stock-data' : '/api/historical-stock-data';
    return this.http.get(`${this.apiUrl}${endpoint}?code=${code}`);
  }
}
