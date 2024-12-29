import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractApiService} from './abstract.api.service';
import {envApi} from '../../utils/env.utils';

@Injectable({
  providedIn: 'root'
})
export class StockService extends AbstractApiService {

  private apiUrl = envApi;  // Your backend API URL

  constructor(private http: HttpClient) {
    super();
  }

  // Get stock symbols and publisher codes
  getStockCodes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock-codes`, {headers: this.getAuthHeaders()});
  }

  // Get stock data for a specific stock symbol or publisher code
  getStockData(code: string, type: 'stockSymbol' | 'publisherCode'): Observable<any> {
    const endpoint = type === 'stockSymbol' ? '/stock-data' : '/historical-stock-data';
    return this.http.get(`${this.apiUrl}${endpoint}?code=${code}`, {headers: this.getAuthHeaders()});
  }
}
