import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { ShareManagementDashboardComponent } from '../share_management_box_dashboard/shareManagementDashboard.component';
import { ICMSDashboardModule } from '../../dashboard.module';
import { Subscription } from 'rxjs';
import { ICMSDashboardService } from '../../services/icms-dashboard.service';

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
  selector: "shareManagementDonutChart",
  templateUrl: "./shareManagementDonutChart.component.html",
  styleUrls: ["./shareManagementDonutChart.component.scss"]
})
export class ShareManagementDonutChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  private subscription: Subscription;
  private allDoughnutDatas:any;


  constructor( private iCMSDashboardService:ICMSDashboardService) {
    this.chartOptions = {
      series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      chart: {
        type: "donut"
      },
      labels: ["A Deceased shareholder (individual)", "Capital Contribution In-kind", "Dividend Payment", "Floating of New Shares", "Joint shareholding", "Limitation on Share Acquisition", "Loss of share certificates", "Period for Deposit of proxy", "Preparation of Share Certificate", "Qualification shares", "Share and Subscription Right Transfer", "Share for Minors","Share Registration","Share Subscription", "Other "],
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
        this.shareManagementDonutDashboardComponent();
  }

  shareManagementDonutDashboardComponent(){
  
    this.subscription = this.iCMSDashboardService.getShareDashboardDonutDatas().subscribe(
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



