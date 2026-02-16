import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnQuickQuiz } from './learn-quick-quiz';

describe('LearnQuickQuiz', () => {
  let component: LearnQuickQuiz;
  let fixture: ComponentFixture<LearnQuickQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnQuickQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnQuickQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
