import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnReadMode } from './learn-read-mode';

describe('LearnReadMode', () => {
  let component: LearnReadMode;
  let fixture: ComponentFixture<LearnReadMode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnReadMode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnReadMode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
