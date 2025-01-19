import {Component, OnInit} from '@angular/core';
import {IStockData} from '../../../../../shared/models/IStockData';
import {HttpClient} from '@angular/common/http';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-work-data',
  templateUrl: './work-data.component.html',
  styleUrl: './work-data.component.scss'
})
export class WorkDataComponent implements OnInit{
  stockData: IStockData[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // Fetch StockData from backend API
    this.http.get<IStockData[]>('http://localhost:3600/api/stock-data').subscribe({
      next: (data) => {
        this.stockData = data;
      },
      error: (err) => {
        console.error('Failed to fetch stock data:', err);
      }
    });
  }
}
