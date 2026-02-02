import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareHero } from './square-hero';

describe('SquareHero', () => {
  let component: SquareHero;
  let fixture: ComponentFixture<SquareHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
