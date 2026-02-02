import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Component } from "@angular/core";
import { AimIconButton } from "./icon-button";

// Wrap the AimIconButton to test if the action triggers a change as we expect
@Component({
  standalone: true,
  imports: [AimIconButton],
  template:
    '<aim-icon-button (actionClick)="onData($event)"></aim-icon-button>',
})
class TestHostAimComponent {
  wasEmitted = false;
  onData<Event>(e: Event) {
    this.wasEmitted = true;
  }
}

describe("IconButton", () => {
  let component: TestHostAimComponent;
  let fixture: ComponentFixture<TestHostAimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostAimComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostAimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call the output when NOT disable", () => {
    fixture.nativeElement.querySelector("button").click();
    expect(component.wasEmitted).toBe(true);
  });
});
