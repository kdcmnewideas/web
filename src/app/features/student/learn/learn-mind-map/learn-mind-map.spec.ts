import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMindMap } from './learn-mind-map';

describe('LearnMindMap', () => {
  let component: LearnMindMap;
  let fixture: ComponentFixture<LearnMindMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnMindMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnMindMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
