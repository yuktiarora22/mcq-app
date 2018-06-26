import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { FilterQuestionsPipe } from './utils/filter-questions.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from './utils/format-time.pipe';
import { McqtestComponent } from './mcqtest/mcqtest.component';
import { TestResultsComponent } from './test-results/test-results.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FacebookShareComponent } from './facebook-share/facebook-share.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    McqtestComponent,
    FilterQuestionsPipe,
    FormatTimePipe,
    TestResultsComponent,
    BarChartComponent,
    FacebookShareComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgProgressModule.forRoot(),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
