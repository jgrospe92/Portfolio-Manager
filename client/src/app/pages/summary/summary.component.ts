import { Component, OnInit } from '@angular/core';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  selectedTicker: string = '';
  selectedShares: number | null = null;
  constructor() { }

  ngOnInit(): void {
  }
  onSelectionChange(event: { ticker: string }) {
    console.log(`Ticker selected: ${event.ticker}`);
    this.selectedTicker = event.ticker;
  }
}
