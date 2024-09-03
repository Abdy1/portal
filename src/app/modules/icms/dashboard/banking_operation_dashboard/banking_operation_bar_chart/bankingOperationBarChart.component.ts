import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ICMSDashboardService } from "../../services/icms-dashboard.service";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexAnnotations,
  ChartComponent
} from "ng-apexcharts";
import { Subscription } from "rxjs";

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
        height: 450,
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
          "ADAMA DISTRICT",
          "ASELLA DISTRICT",
          "BAHIR DAR RELATIONSHIP OFFICE",
          "BALE DISTRICT",
          "CENTRAL FINFINNE DISTRICT",
          "CHIRO DISTRICT",
          "DIRE DAWA DISTRICT",
          "EAST FINFINNE DISTRICT",
          "HAWASSA DISTRICT",
          "HOSANNA DISTRICT",
          "JIMMA DISTRICT",
          "MEKELLE RELATIONSHIP OFFICE",
          "NEKEMTE DISTRICT",
          "NORTH FINFINNE DISTRICT", 
          "SHASHEMANE DISTRICT",
          "SOUTH FINFINNE DISTRICT",
          "WESTERN FINFINNE DISTRICT"
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
      },
      annotations: {
        xaxis: [
          {
            x: "HAWASSA DISTRICT", // The category where you want the vertical line
            borderColor: "#FF4560", // Color of the vertical line
            borderWidth: 2, // Width of the vertical line
            label: {
              text: "Vertical Line",
              style: {
                color: "#fff",
                background: "#FF4560"
              }
            }
          }
        ]
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
        console.log('Received data:', this.allDoughnut);
  
        // Initialize an array with zeros
        let seriesData = new Array(this.chartOptions.xaxis.categories.length).fill(0);
  
        // Update the values for the categories that exist in the response
        for (let category in this.allDoughnut) {
          let index = this.chartOptions.xaxis.categories.indexOf(category);
          if (index !== -1) {
            seriesData[index] = this.allDoughnut[category];
          }
        }
  
        console.log('Categories:', this.chartOptions.xaxis.categories);
        console.log('Series Data:', seriesData);
  
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
