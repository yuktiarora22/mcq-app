import { TestBed, async, inject } from '@angular/core/testing';

import { TestResultsGuard } from './test-results.guard';

describe('TestResultsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestResultsGuard]
    });
  });

  it('should ...', inject([TestResultsGuard], (guard: TestResultsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
