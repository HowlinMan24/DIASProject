import {Component, OnInit} from '@angular/core';
import {IHistoricalStockData} from '../../../../../shared/models/IHistoricalData';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrl: './historical-data.component.scss'
})
export class HistoricalDataComponent implements OnInit {
  historicalStockData: IHistoricalStockData[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // Fetch HistoricalStockData from backend API
    this.http.get<IHistoricalStockData[]>('http://localhost:3600/api/historical-stock-data').subscribe({
      next: (data) => {
        this.historicalStockData = data;
      },
      error: (err) => {
        console.error('Failed to fetch historical stock data:', err);
      }
    });
  }

}
