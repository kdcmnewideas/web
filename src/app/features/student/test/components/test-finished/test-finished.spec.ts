import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFinished } from './test-finished';

describe('TestFinished', () => {
  let component: TestFinished;
  let fixture: ComponentFixture<TestFinished>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFinished]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFinished);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
