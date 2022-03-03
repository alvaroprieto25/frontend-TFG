import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConsumptionComponent } from './custom-consumption.component';

describe('CustomConsumptionComponent', () => {
  let component: CustomConsumptionComponent;
  let fixture: ComponentFixture<CustomConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
