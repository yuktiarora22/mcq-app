import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { McqtestService } from '../mcqtest/mcqtest.service';
import { combineLatest } from 'rxjs';
import { TestAnswers } from '../mcqtest/mcqtest.model';
import { BarChartConfig } from '../bar-chart/bar-chart-config.model';
import { NgProgressComponent } from '@ngx-progressbar/core';

declare var google: any;

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit, AfterViewInit {
  constructor(private mcqtestService: McqtestService) {}

  magnetismScore = 0;
  electricityScore = 0;
  physicsScore = 0;

  chartData: any[];
  chartId: string;
  config: BarChartConfig;
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;

  ngAfterViewInit() {
    this.progressBar.start();
  }

  ngOnInit() {
    combineLatest(
      this.mcqtestService.getTestAnswers,
      this.mcqtestService.loadAnswers()
    ).subscribe(([res1, res2]) => {
      const studentAnswers: TestAnswers[] = res1;
      const answersList: TestAnswers[] = res2;
      this.calculateScore(studentAnswers, answersList);
    });
  }

  calculateScore(studentAnswers: TestAnswers[], answersList: TestAnswers[]) {
    answersList.forEach(answer => {
      const studentAns = studentAnswers.find(a => a.number === answer.number);
      if (studentAns.answer === answer.answer) {
        switch (studentAns.type) {
          case '1':
            this.magnetismScore++;
            break;
          case '2':
            this.electricityScore++;
            break;
          case '3':
            this.physicsScore++;
            break;
        }
      }
    });
    this.showBarChart();
  }

  showBarChart(): void {
    this.chartData = [
      ['Subject', 'Score', { role: 'style' }],
      ['Magnetism', this.magnetismScore, 'blue'],
      ['Electricity', this.electricityScore, 'yellow'],
      ['Physics', this.physicsScore, 'red']
    ];
    this.config = new BarChartConfig(
      'Subject wise test score',
      {
        title: 'Score',
        minValue: 0,
        maxValue: 10
      },
      {
        title: 'Subject'
      }
    );
    this.chartId = 'scoreChart';
  }
}
