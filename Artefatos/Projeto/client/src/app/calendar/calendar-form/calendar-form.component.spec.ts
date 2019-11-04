import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFormComponent } from './calendar-form.component';

describe('CalendarFormComponent', () => {
  let component: CalendarFormComponent;
  let fixture: ComponentFixture<CalendarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
