import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WindowService } from "../../services/window/window-service";
import { XpTitleBar } from "./xp-title-bar";
import { Mocked } from "vitest";

describe.skip("XpTitleBar", () => {
  let component: XpTitleBar;
  let fixture: ComponentFixture<XpTitleBar>;

  let el: HTMLElement;
  let titleEl: HTMLHeadingElement;
  let windowService: WindowService;
  const spy: Mocked<Partial<WindowService>> = {
    close: vi.fn().mockResolvedValue(true),
    minimize: vi.fn().mockResolvedValue(true),
    maximize: vi.fn().mockResolvedValue(true),
    restore: vi.fn().mockResolvedValue(true),
  };

  const ucFirst = (str: string): string => {
    const first = str.charAt(0);
    return `${first.toUpperCase()}${str.slice(1)}`;
  };

  const getByAria = (value: string): HTMLElement => {
    return el.querySelector(`[aria-label="${ucFirst(value)}"]`)!;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XpTitleBar],
      providers: [
        {
          provide: WindowService,
          useValue: spy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(XpTitleBar);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.nativeElement;
    titleEl = el.querySelector<HTMLHeadingElement>("h1")!;
    windowService = TestBed.inject(WindowService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have the default title if not specified", () => {
    expect(titleEl.textContent.trim()).toContain("AIM");
  });

  it("should update the title", async () => {
    fixture.componentRef.setInput("windowTitle", "New title");
    fixture.detectChanges();
    expect(titleEl.textContent.trim()).toContain("New title");
  });

  it("should show/hide control buttons based on the input", async () => {
    const changeInput = (
      name: string,
      value: boolean,
      selector: string = "",
    ) => {
      fixture.componentRef.setInput(name, value);
      fixture.detectChanges();
      return getByAria(selector || name);
    };

    expect(changeInput("minimize", false)).toBeFalsy();
    expect(changeInput("minimize", true)).toBeTruthy();

    expect(changeInput("maximize", false)).toBeFalsy();
    expect(changeInput("maximize", true)).toBeTruthy();

    expect(changeInput("showHelp", false, "help")).toBeFalsy();
    expect(changeInput("showHelp", true, "help")).toBeTruthy();
  });

  it("should show the restore button if maximized", () => {
    windowService.viewState = "maximized";
    fixture.detectChanges();
    expect(getByAria("restore")).toBeTruthy();

    windowService.viewState = "";
    fixture.detectChanges();
    expect(getByAria("restore")).toBeFalsy();
  });

  it("should call window service methods", () => {
    const clickAndDetect = (name: string) => {
      fixture.componentRef.setInput("maximize", true);
      fixture.detectChanges();
      getByAria(name).click();
    };

    clickAndDetect("maximize");
    expect(windowService.maximize).toHaveBeenCalled();

    clickAndDetect("minimize");
    expect(windowService.minimize).toHaveBeenCalled();

    windowService.viewState = "maximized";
    fixture.detectChanges();
    getByAria("restore").click();
    expect(windowService.restore).toHaveBeenCalled();
  });
});
