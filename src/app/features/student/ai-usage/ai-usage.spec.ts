import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiUsage } from './ai-usage';

describe('AiUsage', () => {
  let component: AiUsage;
  let fixture: ComponentFixture<AiUsage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiUsage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiUsage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
