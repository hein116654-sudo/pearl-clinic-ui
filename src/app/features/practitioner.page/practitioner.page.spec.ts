import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerPage } from './practitioner.page';

describe('PractitionerPage', () => {
  let component: PractitionerPage;
  let fixture: ComponentFixture<PractitionerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PractitionerPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
