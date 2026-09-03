import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAllergiesList } from './patient-allergies-list';

describe('PatientAllergiesList', () => {
  let component: PatientAllergiesList;
  let fixture: ComponentFixture<PatientAllergiesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAllergiesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAllergiesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
