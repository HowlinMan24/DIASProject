import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import {StockService} from '../../services/routes/stocks.service';
import 'chartjs-adapter-date-fns';

// Register chartjs and the financial chart types
Chart.register(...registerables, CandlestickController, CandlestickElement);

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit, AfterViewInit {
  stockList: any[] = [];
  publisherList: any[] = [];
  selectedCode: string = '';  // To store selected stock symbol or publisher code
  selectedCodeType: 'stockSymbol' | 'publisherCode' = 'stockSymbol';  // Can be 'stockSymbol' or 'publisherCode'
  candlestickChart: Chart | undefined; // Ensure this is typed properly

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadStockCodes();  // Load stock codes on init
  }

  ngAfterViewInit(): void {
    this.createCandlestickChart();  // Create the chart after the view is initialized
  }

  // Load stock symbols and publisher codes
  loadStockCodes(): void {
    this.stockService.getStockCodes().subscribe((data: any) => {
      this.stockList = data.stockSymbols;
      this.publisherList = data.publisherCodes;
    });
  }

  // Fetch stock data based on selected code
  fetchStockData(): void {
    if (!this.selectedCode) return;  // If no code is selected, don't fetch

    this.stockService.getStockData(this.selectedCode, this.selectedCodeType).subscribe((stockData: any[]) => {
      this.updateCandlestickChart(stockData);
    });
  }

  // Create a candlestick chart
  createCandlestickChart(): void {
    const ctx = (document.getElementById('candlestickChart') as HTMLCanvasElement).getContext('2d');

    if (!ctx) return;

    // Initialize the chart only if it hasn't been initialized yet
    if (this.candlestickChart) {
      this.candlestickChart.destroy(); // Destroy existing chart if present
    }

    this.candlestickChart = new Chart(ctx, {
      type: 'candlestick',  // Specify the chart type as 'candlestick'
      data: {
        datasets: [{
          label: 'Stock Prices',
          data: [], // Initially empty, will be updated after data fetch
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'timeseries',
            time: { unit: 'day' },
            title: { display: true, text: 'Date' }
          },
          y: {
            title: { display: true, text: 'Price (USD)' }
          }
        }
      }
    });
  }

  updateCandlestickChart(stockData: any[]): void {
    console.log(stockData)
    if (!this.candlestickChart) {
      console.error('Chart is not initialized');
      return;
    }

    this.candlestickChart.data.datasets[0].data = stockData.map(item => ({
      x: new Date(item.datePublished).getTime(),
      o: parseFloat(item.averagePrice),
      h: parseFloat(item.maxPrice),
      l: parseFloat(item.minPrice),
      c: parseFloat(item.priceLastTransaction)
    }));

    // Redraw the chart with the updated data
    this.candlestickChart.update();
  }
}
