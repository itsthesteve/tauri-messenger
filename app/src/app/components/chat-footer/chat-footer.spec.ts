import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFooter } from './chat-footer';

describe('ChatFooter', () => {
  let component: ChatFooter;
  let fixture: ComponentFixture<ChatFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
