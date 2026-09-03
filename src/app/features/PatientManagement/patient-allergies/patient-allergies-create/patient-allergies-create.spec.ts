import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  PatientAllergyCreateComponent } from './patient-allergies-create';

describe('PatientAllergiesCreate', () => {
  let component: PatientAllergyCreateComponent;
  let fixture: ComponentFixture<PatientAllergyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAllergyCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAllergyCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
