import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorContainerComponent } from './sector-container.component';

describe('SectorContainerComponent', () => {
  let component: SectorContainerComponent;
  let fixture: ComponentFixture<SectorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
