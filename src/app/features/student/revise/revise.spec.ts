import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Revise } from './revise';

describe('Revise', () => {
  let component: Revise;
  let fixture: ComponentFixture<Revise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Revise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Revise);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
