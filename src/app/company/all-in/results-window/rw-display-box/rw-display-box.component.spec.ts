import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RwDisplayBoxComponent } from './rw-display-box.component';

describe('RwDisplayBoxComponent', () => {
  let component: RwDisplayBoxComponent;
  let fixture: ComponentFixture<RwDisplayBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RwDisplayBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RwDisplayBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
