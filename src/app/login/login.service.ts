import { Injectable } from '@angular/core';
import secrets from '../utils/secrets';
import { Observable } from 'rxjs';
import { McqtestService } from '../mcqtest/mcqtest.service';
import { map } from 'rxjs/operators';

declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private mcqTestService: McqtestService) {
    FB.init({
      appId: secrets.facebookAppId,
      xfbml: false,
      version: 'v2.10'
    });
    FB.AppEvents.logPageView();
  }

  login(): Observable<boolean> {
    return new Observable(function(observer) {
      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          observer.next(response);
        } else {
          FB.login(loginResponse => {
            if (loginResponse.authResponse) {
              observer.next(response);
            } else {
              observer.next(false);
            }
          });
        }
      });
    }).pipe(
      map((res: any) => {
        this.mcqTestService.setUserFBAccessToken(res.authResponse.accessToken);
        return true;
      })
    );
  }
}
