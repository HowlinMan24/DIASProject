import {Component, OnInit} from '@angular/core';
import {IStockData} from '../../../../../shared/models/IStockData';
import {IHistoricalStockData} from '../../../../../shared/models/IHistoricalData';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.scss'
})
export class MainTableComponent implements OnInit{

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {



  }
}
