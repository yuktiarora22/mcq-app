import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import secrets from '../utils/secrets';
import { TestAnswers } from './mcqtest.model';

@Injectable({
  providedIn: 'root'
})
export class McqtestService {
  constructor(private http: HttpClient) {}

  private testAnswers = new BehaviorSubject<TestAnswers[]>(null);
  private chartImageSrc = new BehaviorSubject<string>(null);
  private userFBAccessToken = new BehaviorSubject<string>(null);

  getTestAnswers = this.testAnswers.asObservable();
  getChartImageSrc = this.chartImageSrc.asObservable();
  getUserFBAccessToken = this.userFBAccessToken.asObservable();

  setTestAnswers(categories: TestAnswers[]): void {
    this.testAnswers.next(categories);
  }

  setChartImageSrc(src: string): void {
    this.chartImageSrc.next(src);
  }

  setUserFBAccessToken(token: string): void {
    this.userFBAccessToken.next(token);
  }

  loadQuestions(): Observable<any> {
    const url =
      'https://spreadsheets.google.com/feeds/list/' +
      secrets.googleQuestionSheetId +
      '/od6/public/values?alt=json';

    return this.http
      .get(url)
      .pipe(map((response: any) => this.formatSheetData(response)));
  }

  formatSheetData(data): any {
    const _data = data.feed.entry;
    const returnArray: Array<any> = [];
    if (_data && _data.length > 0) {
      _data.forEach((entry, index) => {
        const obj = {};
        for (const x in entry) {
          if (x.includes('gsx$') && entry[x].$t) {
            obj[x.split('$')[1]] = entry[x]['$t'];
          }
        }
        returnArray.push(obj);
      });
    }
    return returnArray;
  }

  getCounter(counter): Observable<number> {
    let _counter = counter * 60;
    return timer(0, 1000).pipe(
      take(_counter),
      map(() => --_counter)
    );
  }

  loadAnswers(): Observable<any> {
    const url =
      'https://spreadsheets.google.com/feeds/list/' +
      secrets.googleAnswerSheetId +
      '/od6/public/values?alt=json';
    return this.http
      .get(url)
      .pipe(map((response: any) => this.formatSheetData(response)));
  }
}
