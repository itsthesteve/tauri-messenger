import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XpStatusBar } from './xp-status-bar';

describe('XpStatusBar', () => {
  let component: XpStatusBar;
  let fixture: ComponentFixture<XpStatusBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XpStatusBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XpStatusBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
