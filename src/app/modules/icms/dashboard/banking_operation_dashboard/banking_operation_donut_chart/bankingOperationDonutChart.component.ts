import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { ICMSDashboardService } from "../../services/icms-dashboard.service";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions
} from "ng-apexcharts";
import { Subscription } from "rxjs";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: "bankingOperationDonutChart",
  templateUrl: "./bankingOperationDonutChart.component.html",
  styleUrls: ["./bankingOperationDonutChart.component.scss"]
})
export class BankingOperationDonutChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  private subscription: Subscription;
  private allDoughnutDatas: any;


  constructor(private iCMSDashboardService:ICMSDashboardService ) {
    this.chartOptions = {
      series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
      chart: {
        type: "donut"
      },
      labels: ["Cash Management",
               "Customer Account Operation",
               "Suspense Account Management", 
               "Loan and Advances",
               "Forex Trading", 
               "Expense Management", 
               "Digital Banking",
               "Branch Opening Requirements", 
               "Key Book and Rubber Stamp",
               "Interest Free Banking",
               "Stock and Negotiable Instrument Management", 
               "Fixed Asset Management",
               "Human Resource Management"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      plotOptions: {
        pie: {
          donut: {
            size: '70%' // Adjust this value to change the donut radius. Smaller values make the donut radius smaller.
          }
        }
      }
    };


  }
  ngOnInit(){
        this.getbankingOperationDonutData();
  }
  getbankingOperationDonutData(){
     this.subscription = this.iCMSDashboardService.getbankingOperationDonutDatas().subscribe(
      (response:any) => {
        this.allDoughnutDatas = response;
      
 //initialise an array with zero
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
