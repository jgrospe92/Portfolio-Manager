import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService, HistoricalData } from 'src/app/services/data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [DataService]
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() ticker!: string;
  dps: { x: Date, y: number }[] = [];

  private baseUrl = 'https://www.alphavantage.co/query?'; // Add the baseUrl here
  private apiKey = 'FEL6NGU9QU6ZQ0KQ'; // Add your API key here

  chartOptions = {
    theme: 'light2',
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text: 'Stock Closing Price '
    },
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
      console.log('Ticker received:', this.ticker); // Log the received ticker
      this.fetchData();
    }
  }
  

  fetchData(): void {
    if (this.ticker) {
        console.log('Fetching data for ticker:', this.ticker);

        this.dataService.getHistoricalData(this.ticker).subscribe(
            (data: HistoricalData[]) => {
              console.log(data)
                this.dps = data.map((item: HistoricalData) => ({
                    x: new Date(item.date), // The date
                    y: item.close // Only the closing price
                }));
                this.chartOptions.data[0].dataPoints = this.dps;
                this.chartOptions.title.text = 'Stock Closing Price ' + this.ticker;

                this.chartOptions = { ...this.chartOptions }; // Trigger change detection
            },
            error => {
                console.error('Error fetching data:', error);
            }
        );
    }
  }
}
