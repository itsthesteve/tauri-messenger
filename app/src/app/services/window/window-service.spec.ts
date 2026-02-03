import { TestBed } from "@angular/core/testing";

import { WindowService } from "./window-service";

vi.mock("@tauri-apps/api/window", () => ({
  getCurrentWindow: () => ({
    close: vi.fn(),
    show: vi.fn(),
    minimize: vi.fn(),
    maximize: vi.fn(),
    // Add other methods if your service uses them
  }),
}));

describe("WindowService", () => {
  let service: WindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
