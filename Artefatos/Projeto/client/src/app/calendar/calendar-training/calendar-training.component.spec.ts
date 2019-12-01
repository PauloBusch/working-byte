import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTrainingComponent } from './calendar-training.component';

describe('CalendarTrainingComponent', () => {
  let component: CalendarTrainingComponent;
  let fixture: ComponentFixture<CalendarTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
