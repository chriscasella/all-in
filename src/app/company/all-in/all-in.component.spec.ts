import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInComponent } from './all-in.component';

describe('AllInComponent', () => {
  let component: AllInComponent;
  let fixture: ComponentFixture<AllInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
