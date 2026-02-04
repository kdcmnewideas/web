import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTopicsList } from './learn-topics-list';

describe('LearnTopicsList', () => {
  let component: LearnTopicsList;
  let fixture: ComponentFixture<LearnTopicsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnTopicsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnTopicsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
