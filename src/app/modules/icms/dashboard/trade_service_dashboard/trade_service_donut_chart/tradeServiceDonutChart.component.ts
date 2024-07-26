import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: "tradeServiceDonutChart",
  templateUrl: "./tradeServiceDonutChart.component.html",
  styleUrls: ["./tradeServiceDonutChart.component.scss"]
})
export class TradeServiceDonutChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 545, 45,65],
      chart: {
        type: "donut"
      },
      labels: [ "Import", "Export", "Forex Trading", "Foreign Latter of Guarantee", "Forign Transfers", "Correspondent Accounts Reconcilation", "Other"],
      responsive: [
        {
          breakpoint: 480,
          options: {

            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
