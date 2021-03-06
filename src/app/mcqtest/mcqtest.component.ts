import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { McqtestService } from './mcqtest.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TestAnswers, TestQuestions } from './mcqtest.model';
import { NgProgressComponent } from '@ngx-progressbar/core';

@Component({
  selector: 'app-mcqtest',
  templateUrl: './mcqtest.component.html',
  styleUrls: ['./mcqtest.component.css']
})
export class McqtestComponent implements OnInit, AfterViewInit {
  constructor(private mcqtestService: McqtestService, private router: Router) {}

  questions: TestQuestions[] = [];
  countDown;
  counter = 5;
  startTest = false;
  showMagQs = true;
  showElecQs = false;
  showPhyQs = false;
  questionFilter = '1';
  calHeight: string;
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;

  ngAfterViewInit() {
    this.progressBar.start();
  }

  ngOnInit(): void {
    this.secHeight();
    this.mcqtestService.loadQuestions().subscribe(res => {
      this.questions = res;
      this.progressBar.complete();
      this.countDown = this.mcqtestService
        .getCounter(this.counter)
        .pipe(finalize(() => this.submitTest()));
    });
  }

  secHeight(): void {
    this.calHeight = window.innerHeight + 'px';
  }

  showTopicWiseQuestions(topic: string): void {
    this.showMagQs = this.showElecQs = this.showPhyQs = false;
    this.questionFilter = topic;
    switch (topic) {
      case '1':
        this.showMagQs = true;
        break;
      case '2':
        this.showElecQs = true;
        break;
      case '3':
        this.showPhyQs = true;
        break;
    }
  }

  submitTest() {
    const answers: TestAnswers[] = this.questions.map(question => {
      return {
        number: question.number,
        answer: question.selectedAnswer,
        type: question.type
      };
    });
    this.mcqtestService.setTestAnswers(answers);
    this.router.navigateByUrl('/results');
  }
}
