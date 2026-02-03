import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAnalytics } from './exam-analytics';

describe('ExamAnalytics', () => {
  let component: ExamAnalytics;
  let fixture: ComponentFixture<ExamAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamAnalytics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamAnalytics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
