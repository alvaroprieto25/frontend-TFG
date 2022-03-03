import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBusinessComponent } from './home-business.component';

describe('HomeBusinessComponent', () => {
  let component: HomeBusinessComponent;
  let fixture: ComponentFixture<HomeBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
