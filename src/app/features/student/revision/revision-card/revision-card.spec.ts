import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionCard } from './revision-card';

describe('RevisionCard', () => {
  let component: RevisionCard;
  let fixture: ComponentFixture<RevisionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
