import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallMonthCalendarComponent } from './small-month-calendar.component';

describe('SmallMonthCalendarComponent', () => {
  let component: SmallMonthCalendarComponent;
  let fixture: ComponentFixture<SmallMonthCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallMonthCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallMonthCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
