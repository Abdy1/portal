import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ICMSDashboardService } from "../../services/icms-dashboard.service";
import { Subscription } from "rxjs";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: "procurementDonutChart",
  templateUrl: "./procurementDonutChart.component.html",
  styleUrls: ["./procurementDonutChart.component.scss"]
})
export class ProcurementDonutChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  private subscription: Subscription;
  public allPieIfbData: any;

  constructor(private icmsdashboardService: ICMSDashboardService) {
    this.chartOptions = {
      series: [0, 0, 0, 0, 0, 0, 0, 0],
      chart: {
        type: "pie"
      },
      labels: ["Procurement Plan and Requisition", "Preparation of Bidding Document", "Opening of Bids", "Evaluation of Bids", "Approval or Rejection of Bid", "Contract Management", "Performance Security/Performance Bond Guarantee", "Advance Payment"],
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
  ngOnInit() {
    this.getProcurementDashboardPieData();
  }

  getProcurementDashboardPieData(): void {
    this.subscription = this.icmsdashboardService.getProcurmentDashboardPieDatas().subscribe(
      (response: any) => {
        this.allPieIfbData = response;

        

        // Initialize an array with zeros
        let seriesData = new Array(this.chartOptions.labels.length).fill(0);

        // Update the values for the labels that exist in the response
        for (let label in this.allPieIfbData) {
          let index = this.chartOptions.labels.indexOf(label);
          if (index !== -1) {
            seriesData[index] = this.allPieIfbData[label];
          }
        }

        // Update the chart series data
        this.chartOptions.series = seriesData;
      },
      
      (error) => {
        console.error('Failed to get dashboard data:', error);
      }
    );
  }
}
