import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McqtestComponent } from './mcqtest.component';

describe('McqtestComponent', () => {
  let component: McqtestComponent;
  let fixture: ComponentFixture<McqtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McqtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
