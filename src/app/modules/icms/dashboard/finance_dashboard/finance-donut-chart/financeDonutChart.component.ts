import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { Subscription } from "rxjs";
import { ICMSDashboardService } from "../../services/icms-dashboard.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: "financeDonutChart",
  templateUrl: "./financeDonutChart.component.html",
  styleUrls: ["./financeDonutChart.component.scss"]
})
export class FinanceDonutChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

   private subscription: Subscription;
   public allDoughnutDatas: any;

  constructor( private iCMSDashboardService:ICMSDashboardService) {
    this.chartOptions = {
      series: [0,0,0,0,0,0,0,0,0,0],
      chart: {
        type: "donut"
      },
      labels: ["Liquidity Management", "Financial Reports", "Procurement", "Depreciation", "Disposal of Fixed Assets ", "Payrol", "Fund Management", "Tax", "Reconciliation", "Other"],
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
  ngOnInit(){
    this.getFinanceDashboardDonutDatas();
  }

  getFinanceDashboardDonutDatas(){

    this.subscription = this.iCMSDashboardService.getFinanceDashboardDonutDatas().subscribe(
      (response:any) => {
        this.allDoughnutDatas = response;
        console.log("donut", response);

 //initialise an array with zeros
 let seriesData = new Array(this.chartOptions.labels.length).fill(0);

              
        //update the values for the labels that exist in the response
        for (let label in this.allDoughnutDatas) {
          let index = this.chartOptions.labels.indexOf(label);
          if (index !== -1) {
            seriesData[index] = this.allDoughnutDatas[label];
          }
        }

        //update the chart series data
        this.chartOptions.series = seriesData;
      },
       (error) => {
         console.error('Failed to get dashboard data:', error);
       }
      
     );

  }
}
