import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumpbackCard } from './jumpback-card';

describe('JumpbackCard', () => {
  let component: JumpbackCard;
  let fixture: ComponentFixture<JumpbackCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JumpbackCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JumpbackCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
