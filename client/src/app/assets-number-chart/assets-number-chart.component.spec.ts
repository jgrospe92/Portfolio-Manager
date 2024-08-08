import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsNumberChartComponent } from './assets-number-chart.component';

describe('AssetsNumberChartComponent', () => {
  let component: AssetsNumberChartComponent;
  let fixture: ComponentFixture<AssetsNumberChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsNumberChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsNumberChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
