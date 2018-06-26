import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { McqtestService } from '../mcqtest/mcqtest.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestResultsGuard implements CanActivate {
  constructor(private mcqtestService: McqtestService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.mcqtestService.getTestAnswers.pipe(
      map(answers => {
        if (answers && answers.length > 0) {
          return true;
        } else {
          this.router.navigateByUrl('/test');
          return false;
        }
      })
    );
  }
}
