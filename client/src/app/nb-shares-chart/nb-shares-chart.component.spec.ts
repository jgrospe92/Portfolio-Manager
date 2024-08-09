import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbSharesChartComponent } from './nb-shares-chart.component';

describe('NbSharesChartComponent', () => {
  let component: NbSharesChartComponent;
  let fixture: ComponentFixture<NbSharesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NbSharesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbSharesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
