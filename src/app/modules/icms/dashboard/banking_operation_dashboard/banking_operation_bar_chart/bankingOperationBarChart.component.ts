import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ICMSDashboardService } from "../../services/icms-dashboard.service";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexAnnotations
} from "ng-apexcharts";
import { Subscription } from "rxjs";
import { error } from "console";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  annotations: ApexAnnotations;
};

@Component({
  selector: "bankingOperationBarChart",
  templateUrl: "./bankingOperationBarChart.component.html",
  styleUrls: ["./bankingOperationBarChart.component.scss"]
})
export class BankingOperationBarChartComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  private subscription: Subscription;
  private allDoughnut: any;

  constructor(private iCMSDashboardService: ICMSDashboardService) {
    this.chartOptions = {
      series: [
        {
          name: "Operations",
          data: Array(17).fill(0) // Assuming there are 17 districts as per the categories
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '50%'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "Adama",
          "Assela",
          "Bahirdar Area",
          "Bale",
          "Centeral Finfinne",
          "Chiro",
          "Dire Dawa",
          "East Finfinne",
          "Hawassa",
          "Hossana",
          "Jimma",
          "Mekele Area",
          "Nekemte",
          "North Finfinne",
          "Shashemane",
          "South Finfinne",
          "West Finfinne"
        ],
        labels: {
          show: false,
        },
        axisTicks: {
          show: false
        }
      },
      grid: {
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      }
    };
  }

  ngOnInit() {
    this.getbankingOperationBarchartDatas();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getbankingOperationBarchartDatas() {
    this.subscription = this.iCMSDashboardService.getBankingOperationBarchartDashboardDatas().subscribe(
      (response: any) => {
        this.allDoughnut = response;

        // Initialize an array with zeros
        let seriesData = new Array(this.chartOptions.xaxis.categories.length).fill(0);

        // Update the values for the categories that exist in the response
        for (let category in this.allDoughnut) {
          let index = this.chartOptions.xaxis.categories.indexOf(category);
          if (index !== -1) {
            seriesData[index] = this.allDoughnut[category];
          }
        }

        // Update the chart series data
        this.chartOptions.series = [
          {
            name: "Operations",
            data: seriesData
          }
        ];
      },
      (error) => {
        console.error('Failed to get dashboard data:', error);
      }
    );
  }
}