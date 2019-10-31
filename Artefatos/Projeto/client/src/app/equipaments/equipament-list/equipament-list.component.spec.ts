import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentListComponent } from './equipament-list.component';

describe('EquipamentListComponent', () => {
  let component: EquipamentListComponent;
  let fixture: ComponentFixture<EquipamentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
