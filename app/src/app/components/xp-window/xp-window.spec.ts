import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XpWindow } from './xp-window';

describe('XpWindow', () => {
  let component: XpWindow;
  let fixture: ComponentFixture<XpWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XpWindow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XpWindow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
