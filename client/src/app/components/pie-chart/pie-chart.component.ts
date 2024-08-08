import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @Output() selectionChange = new EventEmitter<{ ticker: string, shares: number }>();
  @Input() assets: any[] = [];
  datapoint: { y: number; name: string }[] = [];

  chartOptions = {
    animationEnabled: true,
    title: {
      text: ""
    },
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}: {y}",
      dataPoints: this.datapoint,
      click: (e: { dataPoint: { name: string, shares: number } }) => this.onPieClick(e)
    }]
  };

  onPieClick(e: { dataPoint: { name: string, shares: number } }): void {
    const ticker = e.dataPoint.name;
    const shares = e.dataPoint.shares;
    console.log(`Pie chart segment clicked: ${ticker}, Shares: ${shares}`);
    this.selectionChange.emit({ ticker, shares });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['assets'].firstChange) {
      this.updateChartDataPoints();
    }
  }


  private updateChartDataPoints(): void {
    const totalValue = this.assets.reduce((sum: any, asset: { current_price: any; }) => sum + asset.current_price, 0);

    this.datapoint = this.assets.map((asset: { current_price: number; name: any; }) => ({
      y: (asset.current_price / totalValue) * 100,
      name: asset.name
    }));

    this.updateChartOptions();
    console.log(this.datapoint);
  }

  private updateChartOptions(): void {
    this.chartOptions = {
      ...this.chartOptions,
      data: [{
        ...this.chartOptions.data[0],
        dataPoints: this.datapoint
      }]
    };
  }


}
