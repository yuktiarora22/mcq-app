import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NgProgressComponent } from '@ngx-progressbar/core';

@Component({
  selector: 'app-login2',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private zone: NgZone,
    private loginService: LoginService
  ) {}

  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;

  ngOnInit(): void {}

  onLoginClick() {
    this.progressBar.start();
    this.loginService.login().subscribe(res => {
      if (res) {
        this.progressBar.complete();
        this.navigateToTestPage();
      }
    });
  }

  navigateToTestPage(): void {
    this.zone.run(() => this.router.navigateByUrl('/test'));
  }
}
