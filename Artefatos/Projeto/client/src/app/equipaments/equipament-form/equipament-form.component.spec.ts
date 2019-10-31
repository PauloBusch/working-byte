import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentFormComponent } from './equipament-form.component';

describe('EquipamentFormComponent', () => {
  let component: EquipamentFormComponent;
  let fixture: ComponentFixture<EquipamentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
