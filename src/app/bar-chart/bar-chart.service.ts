import { Injectable } from '@angular/core';
import { BarChartConfig } from './bar-chart-config.model';
import { GoogleChartsBaseService } from '../utils/google-charts.service';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class BarChartService {
  constructor(private googleChartsBaseService: GoogleChartsBaseService) {}

  public BuildBarChart(
    elementId: String,
    data: any[],
    config: BarChartConfig,
    progressBar: any
  ): void {
    const chartFunc = () => {
      return new google.visualization.ComboChart(
        document.getElementById(<string>elementId)
      );
    };
    const options = {
      title: config.title,
      vAxis: {
        title: config.vAxis.title,
        minValue: config.vAxis.minValue,
        maxValue: config.vAxis.maxValue
      },
      hAxis: { title: config.hAxis.title },
      seriesType: 'bars'
    };

    this.googleChartsBaseService.buildChart(
      data,
      chartFunc,
      options,
      progressBar
    );
  }
}
