import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFormButtons } from './chat-form-buttons';

describe('ChatFormButtons', () => {
  let component: ChatFormButtons;
  let fixture: ComponentFixture<ChatFormButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatFormButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatFormButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
