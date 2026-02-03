import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnPodcastMode } from './learn-podcast-mode';

describe('LearnPodcastMode', () => {
  let component: LearnPodcastMode;
  let fixture: ComponentFixture<LearnPodcastMode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnPodcastMode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnPodcastMode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
