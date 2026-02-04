import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Written } from './written';

describe('Written', () => {
  let component: Written;
  let fixture: ComponentFixture<Written>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Written]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Written);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
