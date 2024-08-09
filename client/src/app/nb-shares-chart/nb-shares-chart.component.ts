import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nb-shares-chart',
  templateUrl: './nb-shares-chart.component.html',
  styleUrl: './nb-shares-chart.component.scss'
})
export class NbSharesChartComponent {
  @Output() selectionChange = new EventEmitter<{ ticker: string, shares: number }>();
  @Input() assets: any[] = [];
  @Input() realizedPnL: any = 1;
  @Input() unrealizedPnL: any = -1;
  datapoint: { y: number; name: string }[] = [];

  chartOptions = {
    animationEnabled: true,
    title: {
      text: ""
    },
    data: [{
      type: "pie",
      yValueFormatString: "#,###.##",
      indexLabel: "{name}: {y}",
      dataPoints: this.datapoint,
      click: (e: { dataPoint: { name: string, shares: number } }) => this.onPieClick(e)
    }]
  };

  barChartOptions = {
    title: {
      text: "Realized PnL vs UnRealized PnL"  
    },
    animationEnabled: true,
    axisX: {
      valueFormatString: " "
    },
    data: [{        
      type: "column",
      dataPoints: [
        { label: "Realized PnL", y: this.realizedPnL },
        { label: "UnRealized PnL", y: this.unrealizedPnL }
      ]
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

    this.datapoint = this.assets.map((asset: { quantity: number; name: any; }) => ({
      y: asset.quantity ,
      name: asset.name
    }));

    this.updateChartOptions();
  }

  private updateChartOptions(): void {
    this.chartOptions = {
      ...this.chartOptions,
      data: [{
        ...this.chartOptions.data[0],
        dataPoints: this.datapoint
      }]
    };

    this.barChartOptions = {
      ...this.barChartOptions,
      data: [{
        ...this.barChartOptions.data[0],
        dataPoints: [
          { label: "Realized PnL", y: Number(this.realizedPnL) },
          { label: "UnRealized PnL", y: Number(this.unrealizedPnL) }
        ]
      }]
    };
  }


}
