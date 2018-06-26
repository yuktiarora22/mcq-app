import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { McqtestComponent } from './mcqtest/mcqtest.component';
import { TestResultsComponent } from './test-results/test-results.component';
import { LoginGuard } from './login/login.guard';
import { TestResultsGuard } from './test-results/test-results.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'test',
    component: McqtestComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'results',
    component: TestResultsComponent,
    canActivate: [TestResultsGuard]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
