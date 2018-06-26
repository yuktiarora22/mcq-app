import { Component, Input, OnInit } from '@angular/core';
import { BarChartConfig } from './bar-chart-config.model';
import { BarChartService } from './bar-chart.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() data: any[];
  @Input() config: BarChartConfig;
  @Input() elementId: string;
  @Input() progressBar: any;

  constructor(private barChartService: BarChartService) {}

  ngOnInit(): void {
    this.barChartService.BuildBarChart(
      this.elementId,
      this.data,
      this.config,
      this.progressBar
    );
  }
}
