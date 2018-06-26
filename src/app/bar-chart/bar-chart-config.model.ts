export class BarChartConfig {
  title: string;
  vAxis: any;
  hAxis: any;

  constructor(title: string, vAxis: any, hAxis: any) {
    this.title = title;
    this.vAxis = vAxis;
    this.hAxis = hAxis;
  }
}
