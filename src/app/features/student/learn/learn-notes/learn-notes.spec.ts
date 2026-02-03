import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnNotes } from './learn-notes';

describe('LearnNotes', () => {
  let component: LearnNotes;
  let fixture: ComponentFixture<LearnNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnNotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
