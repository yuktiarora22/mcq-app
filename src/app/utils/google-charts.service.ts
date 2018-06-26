import { Injectable } from '@angular/core';
import { McqtestService } from '../mcqtest/mcqtest.service';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleChartsBaseService {
  constructor(private mcqTestService: McqtestService) {
    google.charts.load('current', { packages: ['corechart'] });
  }

  buildChart(
    data: any[],
    chartFunc: any,
    options: any,
    progressBar: any
  ): void {
    const func = (chartFunction, _options) => {
      const datatable = google.visualization.arrayToDataTable(data);
      const chart = chartFunction();
      google.visualization.events.addListener(
        chart,
        'ready',
        function() {
          this.mcqTestService.setChartImageSrc(chart.getImageURI());
        }.bind(this)
      );
      chart.draw(datatable, _options);
      progressBar.complete();
    };
    const callback = () => func(chartFunc, options);
    google.charts.setOnLoadCallback(callback);
  }
}
