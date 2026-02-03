import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RootBase } from "./root";
import { WindowService } from "../../services/window/window-service";

describe("RootBase", () => {
  let component: RootBase;
  let fixture: ComponentFixture<RootBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootBase],
      providers: [WindowService],
    }).compileComponents();

    fixture = TestBed.createComponent(RootBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
