import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestIntro } from './test-intro';

describe('TestIntro', () => {
  let component: TestIntro;
  let fixture: ComponentFixture<TestIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestIntro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestIntro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
