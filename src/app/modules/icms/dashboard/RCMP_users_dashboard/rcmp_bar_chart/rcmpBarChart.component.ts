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
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380, 470, 540, 580, 266, 888, 90]
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
          colors: {
            ranges: [
              {
                from: 0,
                to: 4, // First five data points (indices 0 to 4)
                color: "#FF4560" // Color for the first five data points
              },
              {
                from: 5,
                to: 17, // Remaining data points (indices 5 to 17)
                color: "#008FFB" // Color for the remaining data points
              }
            ]
          }
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
          show: true, // Set to true to show labels
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true
        }
      },
      grid: {
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      annotations: {
        yaxis: [
          {
            y: 4.5, // Position the line between the 5th and 6th data points
            borderColor: "#000000", // Line color
            borderWidth: 2, // Line width
            label: {
              text: "",
              style: {
                color: "#000000",
                background: "#ffffff",
              },
            }
          }
        ],
        xaxis: [
          {
            x: 0,
            x2: 4, // Create a colored region for "Head Office"
            fillColor: "#f2f2f2",
            label: {
              text: "Head Office",
              position: 'top', // Adjust position to 'top' to avoid overlap
              style: {
                color: "#333",
                background: "#f2f2f2",
              },
              offsetY: -5, // Adjust the vertical offset
            }
          },
          {
            x: 5,
            x2: 17, // Create a colored region for "District"
            fillColor: "#e6e6e6",
            label: {
              text: "District",
              position: 'top', // Adjust position to 'top' to avoid overlap
              style: {
                color: "#333",
                background: "#e6e6e6",
              },
              offsetY: 170, // Adjust the vertical offset
            }
          }
        ]
      }
    };
  }
}
