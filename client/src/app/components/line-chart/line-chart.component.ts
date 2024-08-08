import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService, HistoricalData } from 'src/app/services/data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() ticker!: string;
  dps: { x: Date, y: number }[] = [];

  chartOptions = {
    theme: 'light2',
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text: ''
    },
    subtitles: [{
      text: "Loading Data...",
      fontSize: 24,
      horizontalAlign: "center",
      verticalAlign: "center",
      dockInsidePlotArea: true
    }],
    axisY: {
      title: 'Closing Price (in USD)',
      prefix: '$'
    },
    data: [{
      type: 'line',
      name: 'Closing Price',
      yValueFormatString: '$#,###.00',
      xValueType: 'dateTime',
      dataPoints: this.dps
    }]
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    if (this.ticker) {
      this.fetchData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticker'] && !changes['ticker'].firstChange) {
      this.fetchData();
    }
  }

  fetchData(): void {
    console.log(`Fetching data for ticker: ${this.ticker}`);
    if (this.ticker) {
      this.dataService.getHistoricalData(this.ticker).subscribe(
        (data: HistoricalData[]) => {
          console.log('Data received:', data);
          this.dps = data.map((item: HistoricalData) => ({
            x: new Date(item.date),
            y: item.close
          }));
          this.chartOptions.data[0].dataPoints = this.dps;
          this.chartOptions.subtitles = []; 
          this.chartOptions = { ...this.chartOptions }; 
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }
}
