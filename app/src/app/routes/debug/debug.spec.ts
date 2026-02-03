import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WindowService } from "../../services/window/window-service";
import { Debug } from "./debug";

describe("Debug", () => {
  let component: Debug;
  let fixture: ComponentFixture<Debug>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [WindowService],
      imports: [Debug],
    }).compileComponents();

    fixture = TestBed.createComponent(Debug);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
