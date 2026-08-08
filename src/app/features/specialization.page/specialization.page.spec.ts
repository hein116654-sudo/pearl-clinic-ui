import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationPage } from './specialization.page';

describe('SpecializationPage', () => {
  let component: SpecializationPage;
  let fixture: ComponentFixture<SpecializationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
