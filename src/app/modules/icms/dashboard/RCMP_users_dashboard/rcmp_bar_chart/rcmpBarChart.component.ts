import { Component, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexAnnotations,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  annotations: ApexAnnotations;
};

@Component({
  selector: "rcmpBarChart",
  templateUrl: "./rcmpBarChart.component.html",
  styleUrls: ["./rcmpBarChart.component.scss"]
})
export class RCMPBarChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 470, 540, 580, 266, 888, 200, 333, 222, 444]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false // This line hides the toolbar
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '50%', // Adjust this value as needed
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "Supply Chain",
          "Trade Serv",
          "IFB Process",
          "Share Mgt",
          "Finance ",
          "West Finfinne",
          "Shashemene ",
          "South Finfinne",
          "North Finfinne",
          "Nekemte",
          "Jimma",
          "Hosanna",
          "Hawassa",
          "East Finfinne",
          "Dire Dawa",
          "Chiro ",
          "Centeral",
          "Assela",
          "Adama"
        ],
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true, // Ensure labels are visible
          style: {
            colors: '#000', // Set label color if needed
            fontSize: '12px'
          }
        },
        axisBorder: {
          show: false // Hide the border of the y-axis
        },
        axisTicks: {
          show: true, // Show ticks on y-axis
        }
      },
      grid: {
        strokeDashArray: 0, // Solid lines
        xaxis: {
          lines: {
            show: false, // Hide vertical grid lines
          },
        },
        yaxis: {
          lines: {
            show: true, // Show horizontal grid lines
            // Configuration for color and width might not be supported directly
          },
        },
      },
    };
  }
}
