import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPage } from './patient.page';

describe('PatientPage', () => {
  let component: PatientPage;
  let fixture: ComponentFixture<PatientPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
