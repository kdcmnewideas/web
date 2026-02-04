import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oral } from './oral';

describe('Oral', () => {
  let component: Oral;
  let fixture: ComponentFixture<Oral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Oral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
