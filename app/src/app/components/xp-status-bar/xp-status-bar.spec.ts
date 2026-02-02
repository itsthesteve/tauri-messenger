import { ComponentFixture, TestBed } from "@angular/core/testing";

import { XpStatusBar } from "./xp-status-bar";

describe("XpStatusBar", () => {
  let component: XpStatusBar;
  let fixture: ComponentFixture<XpStatusBar>;

  let footerEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XpStatusBar],
    }).compileComponents();

    fixture = TestBed.createComponent(XpStatusBar);
    component = fixture.componentInstance;
    footerEl = fixture.nativeElement.querySelector("footer")!;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should apply the class accordingly", () => {
    fixture.componentRef.setInput("hideTopBorder", true);
    expect(footerEl.classList).toContain("no-shadow");

    fixture.componentRef.setInput("hideTopBorder", false);
    fixture.detectChanges();

    expect(footerEl.classList).not.toContain("no-shadow");
  });
});
