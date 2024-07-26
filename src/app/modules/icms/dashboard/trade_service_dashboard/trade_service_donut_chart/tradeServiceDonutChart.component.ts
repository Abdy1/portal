import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

import { ICMSDashboardService } from "../../services/icms-dashboard.service";
import { Subscription } from "rxjs";
import { error } from "console";


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

  private subscription: Subscription;
  public allDoughnutDatas: any;
  

  constructor(private iCMSDashboardService: ICMSDashboardService  ) {
    this.chartOptions = {
      series: [0, 0, 0, 0, 0, 0],
      chart: {
        type: "pie"
      },
      labels: [ "Import", "Export", "Foreign Letter of Guarantee", "Foreign Transfers", "Correspondent Accounts Reconciliation", "Other"],
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
    this.getTradeDashboardDonutDatas();
  }


  getTradeDashboardDonutDatas(): void {
     this.subscription = this.iCMSDashboardService.getTradeDashboardDonutDatas().subscribe(
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
