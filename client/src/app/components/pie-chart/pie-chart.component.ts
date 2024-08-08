import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  @Output() selectionChange = new EventEmitter<{ ticker: string, shares: number }>();

  chartOptions = {
    animationEnabled: true,
    title: {
      text: ""
    },
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}: {y}",
      dataPoints: [
        { y: 40, name: "AAPL", shares: 50 }, 
        { y: 20, name: "MSFT", shares: 30 }, 
        { y: 15, name: "GOOGL", shares: 20 }, 
        { y: 10, name: "AMZN", shares: 15 }, 
        { y: 10, name: "TSLA", shares: 10 }, 
        { y: 5, name: "NFLX", shares: 5 } 
      ],
      click: (e: { dataPoint: { name: string, shares: number } }) => this.onPieClick(e)
    }]
  };

  onPieClick(e: { dataPoint: { name: string, shares: number } }): void {
    const ticker = e.dataPoint.name;
    const shares = e.dataPoint.shares;
    console.log(`Pie chart segment clicked: ${ticker}, Shares: ${shares}`);
    this.selectionChange.emit({ ticker, shares });
  }
}
