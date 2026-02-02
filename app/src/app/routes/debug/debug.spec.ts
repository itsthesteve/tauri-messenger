import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Debug } from "./debug";
import { WindowService } from "../../services/window/window-service";
import { Mocked } from "vitest";

describe("Debug", () => {
  let component: Debug;
  let fixture: ComponentFixture<Debug>;

  beforeEach(async () => {
    const spy: Mocked<Partial<WindowService>> = { close: vi.fn() };

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: WindowService,
          useValue: spy,
        },
      ],
      imports: [Debug],
    }).compileComponents();

    fixture = TestBed.createComponent(Debug);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
