import { Component, OnInit, Input } from '@angular/core';
import { McqtestService } from '../mcqtest/mcqtest.service';

declare var google: any;

@Component({
  selector: 'app-facebook-share',
  template:
    '<a class="btn btn-primary btn-xl" (click)="openFBSharePopup()">Share to Facebook</a>'
})
export class FacebookShareComponent implements OnInit {
  @Input() url = location.href;

  constructor(private mcqTestService: McqtestService) {}

  ngOnInit() {}

  openFBSharePopup() {
    this.mcqTestService.getChartImageSrc.subscribe(src => {
      if (src) {
        FB.ui(
          {
            method: 'share',
            display: 'popup',
            href: this.url,
            picture: src
          },
          function(response) {}
        );
      }
    });
  }
}
