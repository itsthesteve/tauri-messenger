import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetScreenName } from './get-screen-name';

describe('GetScreenName', () => {
  let component: GetScreenName;
  let fixture: ComponentFixture<GetScreenName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetScreenName]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetScreenName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
