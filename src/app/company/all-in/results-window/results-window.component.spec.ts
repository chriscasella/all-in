import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsWindowComponent } from './results-window.component';

describe('ResultsWindowComponent', () => {
  let component: ResultsWindowComponent;
  let fixture: ComponentFixture<ResultsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
