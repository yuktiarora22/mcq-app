import { Injectable } from '@angular/core';
import secrets from '../utils/secrets';
import { Observable } from 'rxjs';

declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() {
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
          observer.next(true);
        } else {
          FB.login(loginResponse => {
            if (loginResponse.authResponse) {
              observer.next(true);
            } else {
              observer.next(false);
            }
          });
        }
      });
    });
  }
}
