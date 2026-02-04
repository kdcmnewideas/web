import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBlanks } from './fill-blanks';

describe('FillBlanks', () => {
  let component: FillBlanks;
  let fixture: ComponentFixture<FillBlanks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillBlanks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillBlanks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
